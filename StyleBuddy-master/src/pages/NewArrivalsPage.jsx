// src/pages/NewArrivalsPage.jsx
import React, { useState } from 'react';

const NewArrivalsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedSizes, setSelectedSizes] = useState({});

  const newArrivals = [
    {
      id: 1,
      name: 'Кожаная куртка-бомбер',
      brand: 'ZARA',
      price: 18990,
      originalPrice: 24990,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
      category: 'Верхняя одежда',
      color: 'Черный',
      sizes: ['XS', 'S', 'M', 'L'],
      isNew: true,
      isPopular: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Платье миди с цветочным принтом',
      brand: 'H&M',
      price: 7990,
      originalPrice: 9990,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      category: 'Платья',
      color: 'Белый',
      sizes: ['S', 'M', 'L'],
      isNew: true,
      isPopular: true,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Беговые кроссовки Air Max',
      brand: 'Nike',
      price: 15990,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      category: 'Обувь',
      color: 'Белый/Розовый',
      sizes: ['38', '39', '40', '41', '42'],
      isNew: true,
      isTrending: true,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Джинсы скинни с высокой талией',
      brand: 'Levi\'s',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
      category: 'Джинсы',
      color: 'Синий',
      sizes: ['W25', 'W26', 'W27', 'W28', 'W29'],
      isNew: true,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Шелковая блузка с жабо',
      brand: 'Massimo Dutti',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      category: 'Блузки',
      color: 'Кремовый',
      sizes: ['XS', 'S', 'M'],
      isNew: true,
      isPopular: true,
      rating: 4.5
    },
    {
      id: 6,
      name: 'Спортивный костюм Oversize',
      brand: 'Adidas',
      price: 14990,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop',
      category: 'Спорт',
      color: 'Серый',
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: true,
      isTrending: true,
      rating: 4.8
    },
    {
      id: 7,
      name: 'Сумка-тоут из экокожи',
      brand: 'Mango',
      price: 9990,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      category: 'Аксессуары',
      color: 'Коричневый',
      isNew: true,
      rating: 4.4
    },
    {
      id: 8,
      name: 'Тренч из смесового хлопка',
      brand: 'Bershka',
      price: 13990,
      originalPrice: 17990,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
      category: 'Верхняя одежда',
      color: 'Бежевый',
      sizes: ['XS', 'S', 'M', 'L'],
      isNew: true,
      rating: 4.7
    },
    {
      id: 9,
      name: 'Кроссовки платформы',
      brand: 'Puma',
      price: 11990,
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=500&fit=crop',
      category: 'Обувь',
      color: 'Черный',
      sizes: ['36', '37', '38', '39'],
      isNew: true,
      isTrending: true,
      rating: 4.6
    }
  ];

  // Функция фильтрации товаров
  const filteredItems = selectedCategory === 'Все' 
    ? newArrivals 
    : newArrivals.filter(item => item.category === selectedCategory);

  // Уникальные категории для фильтров
  const categories = ['Все', 'Верхняя одежда', 'Платья', 'Обувь', 'Джинсы', 'Блузки', 'Спорт', 'Аксессуары'];

  // Функция для получения цвета категории
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Верхняя одежда': return 'bg-blue-100 text-blue-800';
      case 'Платья': return 'bg-pink-100 text-pink-800';
      case 'Обувь': return 'bg-purple-100 text-purple-800';
      case 'Джинсы': return 'bg-indigo-100 text-indigo-800';
      case 'Блузки': return 'bg-rose-100 text-rose-800';
      case 'Спорт': return 'bg-green-100 text-green-800';
      case 'Аксессуары': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Функция для добавления в корзину
  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    
    if (item.sizes && item.sizes.length > 0 && !selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    const productToAdd = {
      ...item,
      size: selectedSize || null
    };

    // Получаем текущую корзину из localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = savedCart.find(cartItem => cartItem.id === productToAdd.id);
    
    let updatedCart;
    if (existingItem) {
      // Увеличиваем количество
      updatedCart = savedCart.map(cartItem =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Добавляем новый товар
      updatedCart = [...savedCart, { ...productToAdd, quantity: 1 }];
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Показываем уведомление
    showNotification(`${item.name} добавлен в корзину!`);
    
    // Обновляем счетчик в заголовке
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Функция для выбора размера
  const handleSelectSize = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  // Функция показа уведомления
  const showNotification = (message) => {
    // Удаляем старое уведомление если есть
    const oldNotification = document.querySelector('.cart-notification');
    if (oldNotification) oldNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up flex items-center gap-2';
    notification.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold rounded-full animate-pulse">
              НОВИНКИ
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Свежие поступления
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Откройте для себя последние коллекции и тренды этого сезона. 
            Эксклюзивные новинки от любимых брендов уже в продаже!
          </p>
        </div>

        {/* Фильтры и сортировка */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition transform hover:-translate-y-0.5 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-purple-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Найдено товаров: <span className="font-bold text-purple-600">{filteredItems.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">Сортировка:</span>
              <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none">
                <option>По новизне</option>
                <option>По цене (сначала дешевые)</option>
                <option>По цене (сначала дорогие)</option>
                <option>По популярности</option>
              </select>
            </div>
          </div>
        </div>

        {/* Карточки товаров */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Верхняя часть с изображением и бейджами */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Бейджи */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.isNew && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      НОВИНКА
                    </span>
                  )}
                  {item.discount && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      -{item.discount}%
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                      ПОПУЛЯРНО
                    </span>
                  )}
                  {item.isTrending && (
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                      ТРЕНД
                    </span>
                  )}
                </div>

                {/* Кнопка быстрого просмотра */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Информация о товаре */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.brand} • {item.color}</p>

                {/* Цена */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </span>
                  {item.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        {item.originalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm font-bold text-red-500">
                        Экономия {(item.originalPrice - item.price).toLocaleString('ru-RU')} ₽
                      </span>
                    </>
                  )}
                </div>

                {/* Размеры */}
                {item.sizes && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Размеры:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.sizes.map((size) => (
                        <button 
                          key={size}
                          onClick={() => handleSelectSize(item.id, size)}
                          className={`px-3 py-1 text-sm border rounded transition ${
                            selectedSizes[item.id] === size
                              ? 'border-purple-500 bg-purple-50 text-purple-600'
                              : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Кнопки действий */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition transform hover:-translate-y-0.5"
                  >
                    В корзину
                  </button>
                  <button className="px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет товаров */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Новинки не найдены</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              В категории "{selectedCategory}" пока нет новинок. 
              Попробуйте выбрать другую категорию или загляните позже.
            </p>
            <button 
              onClick={() => setSelectedCategory('Все')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition"
            >
              Показать все новинки
            </button>
          </div>
        )}

        {/* Преимущества */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-4">🚚</div>
            <h4 className="font-bold text-gray-900 mb-2">Бесплатная доставка</h4>
            <p className="text-gray-600">При заказе от 5 000 ₽</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-4">↩️</div>
            <h4 className="font-bold text-gray-900 mb-2">Легкий возврат</h4>
            <p className="text-gray-600">В течение 30 дней</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-4">👑</div>
            <h4 className="font-bold text-gray-900 mb-2">Эксклюзивные новинки</h4>
            <p className="text-gray-600">Только у нас первыми</p>
          </div>
        </div>

        {/* Новостная рассылка */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Узнавайте о новинках первыми!</h2>
          <p className="mb-6 opacity-90">
            Подпишитесь на рассылку и получайте уведомления о новых поступлениях и эксклюзивных скидках
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition">
              Подписаться
            </button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            Подписываясь, вы соглашаетесь с нашей политикой конфиденциальности
          </p>
        </div>
      </div>

      {/* Стили для анимаций */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fadeOut 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewArrivalsPage;