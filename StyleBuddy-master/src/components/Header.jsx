// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';
import CartModal from './CartModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Проверка корзины и подписка на изменения
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = savedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    // Инициализация при загрузке
    updateCartCount();

    // Подписка на событие обновления корзины
    window.addEventListener('cartUpdated', updateCartCount);

    // Очистка
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Проверка авторизации
  useEffect(() => {
    checkAuthStatus();
    window.addEventListener('authChange', checkAuthStatus);
    
    return () => {
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    setIsAuthenticated(authStatus === 'true');
    setUser(userData);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-white"/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                StyleBuddy
              </span>
            </Link>

            {/* Навигация */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/catalog" className="text-gray-700 hover:text-purple-600 transition">Каталог</Link>
              <Link to="/new" className="text-gray-700 hover:text-purple-600 transition">Новинки</Link>
              <Link to="/brands" className="text-gray-700 hover:text-purple-600 transition">Бренды</Link>
              <Link to="/styles" className="text-gray-700 hover:text-purple-600 transition">Стили</Link>
              <Link to="/sale" className="text-gray-700 hover:text-purple-600 transition">Распродажа</Link>
            </nav>

            {/* Иконки действий */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-700"/>
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <ShoppingBagIcon className="h-6 w-6 text-gray-700"/>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={handleUserClick}
                className="p-2 hover:bg-gray-100 rounded-full flex items-center space-x-2"
              >
                <UserIcon className="h-6 w-6 text-gray-700"/>
                {isAuthenticated && user && (
                  <span className="hidden md:inline text-sm font-medium">
                    Привет, {user.name.split(' ')[0]}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Модальное окно авторизации */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Модальное окно профиля */}
      {isAuthenticated && (
        <UserProfile 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* Модальное окно корзины */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};


export default Header;