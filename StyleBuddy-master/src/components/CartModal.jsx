// src/components/CartModal.jsx
import React, { useState, useEffect } from 'react';
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Загрузка корзины из localStorage
  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    calculateTotal(savedCart);
  };

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(totalAmount);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    localStorage.setItem('cart', '[]');
    setCart([]);
    setTotal(0);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Затемнение фона */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Модальное окно */}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ShoppingBagIcon className="h-8 w-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Корзина</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Корзина пуста</h4>
                <p className="text-gray-500 mb-8">Добавьте товары из каталога</p>
                <Link
                  to="/catalog"
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition inline-block"
                >
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.brand}</p>
                            {item.size && (
                              <p className="text-sm text-gray-500">Размер: {item.size}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 h-6"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="p-1 border rounded hover:bg-gray-100"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="p-1 border rounded hover:bg-gray-100"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-bold">
                            {((item.price * (item.quantity || 1)).toLocaleString('ru-RU'))} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition text-center"
                    >
                      Оформить заказ
                    </Link>
                    
                    <button
                      onClick={clearCart}
                      className="w-full px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition"
                    >
                      Очистить корзину
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                    >
                      Продолжить покупки
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;