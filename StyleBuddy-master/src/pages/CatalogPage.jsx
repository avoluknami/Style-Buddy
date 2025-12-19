// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, SparklesIcon } from '@heroicons/react/24/outline';

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Категории
  const categories = [
    { id: 'all', name: 'Все', count: 156 },
    { id: 'clothes', name: 'Одежда', count: 89 },
    { id: 'shoes', name: 'Обувь', count: 34 },
    { id: 'accessories', name: 'Аксессуары', count: 25 },
    { id: 'outerwear', name: 'Верхняя одежда', count: 18 },
    { id: 'dresses', name: 'Платья', count: 22 },
    { id: 'jeans', name: 'Джинсы', count: 15 },
    { id: 'sport', name: 'Спортивная одежда', count: 28 }
  ];

  // Бренды
  const brands = [
    { id: 'zara', name: 'ZARA', count: 45 },
    { id: 'hm', name: 'H&M', count: 38 },
    { id: 'nike', name: 'Nike', count: 32 },
    { id: 'levis', name: 'Levi\'s', count: 18 },
    { id: 'adidas', name: 'Adidas', count: 27 },
    { id: 'mango', name: 'Mango', count: 24 },
    { id: 'bershka', name: 'Bershka', count: 19 },
    { id: 'massimo', name: 'Massimo Dutti', count: 14 }
  ];

  // Цвета
  const colors = [
    { name: 'Черный', value: '#000000', count: 45 },
    { name: 'Белый', value: '#FFFFFF', count: 38 },
    { name: 'Синий', value: '#3B82F6', count: 32 },
    { name: 'Красный', value: '#EF4444', count: 18 },
    { name: 'Зеленый', value: '#10B981', count: 15 },
    { name: 'Бежевый', value: '#F5F5DC', count: 22 },
    { name: 'Серый', value: '#6B7280', count: 27 },
    { name: 'Розовый', value: '#EC4899', count: 14 }
  ];

  // Пример товаров
  const allProducts = [
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
      rating: 4.8,
      reviews: 128,
      isNew: true,
      isPopular: true
    },
    {
      id: 2,
      name: 'Джинсы скинни',
      brand: 'Levi\'s',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
      category: 'Джинсы',
      color: 'Синий',
      sizes: ['W25', 'W26', 'W27', 'W28'],
      rating: 4.6,
      reviews: 256,
      isPopular: true
    },
    {
      id: 3,
      name: 'Беговые кроссовки',
      brand: 'Nike',
      price: 15990,
      originalPrice: 19990,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      category: 'Обувь',
      color: 'Белый/Розовый',
      sizes: ['38', '39', '40', '41', '42'],
      rating: 4.9,
      reviews: 189,
      isNew: true
    },
    {
      id: 4,
      name: 'Платье миди с цветочным принтом',
      brand: 'H&M',
      price: 7990,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      category: 'Платья',
      color: 'Белый',
      sizes: ['S', 'M', 'L'],
      rating: 4.7,
      reviews: 94
    },
    {
      id: 5,
      name: 'Спортивный костюм',
      brand: 'Adidas',
      price: 14990,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop',
      category: 'Спортивная одежда',
      color: 'Серый',
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 203,
      isPopular: true
    },
    {
      id: 6,
      name: 'Сумка-тоут',
      brand: 'Mango',
      price: 9990,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      category: 'Аксессуары',
      color: 'Коричневый',
      rating: 4.4,
      reviews: 67
    },
    {
      id: 7,
      name: 'Тренч',
      brand: 'Bershka',
      price: 13990,
      originalPrice: 17990,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
      category: 'Верхняя одежда',
      color: 'Бежевый',
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 4.7,
      reviews: 112
    },
    {
      id: 8,
      name: 'Кроссовки платформы',
      brand: 'Puma',
      price: 11990,
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=500&fit=crop',
      category: 'Обувь',
      color: 'Черный',
      sizes: ['36', '37', '38', '39'],
      rating: 4.6,
      reviews: 156,
      isNew: true
    },
    {
      id: 9,
      name: 'Шелковая блузка',
      brand: 'Massimo Dutti',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
      category: 'Одежда',
      color: 'Кремовый',
      sizes: ['XS', 'S', 'M'],
      rating: 4.5,
      reviews: 89
    },
    {
      id: 10,
      name: 'Бомбер',
      brand: 'ZARA',
      price: 10990,
      originalPrice: 14990,
      discount: 27,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=500&fit=crop',
      category: 'Верхняя одежда',
      color: 'Зеленый',
      sizes: ['S', 'M', 'L'],
      rating: 4.3,
      reviews: 78
    },
    {
      id: 11,
      name: 'Юбка миди',
      brand: 'H&M',
      price: 5990,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      category: 'Одежда',
      color: 'Черный',
      sizes: ['XS', 'S', 'M'],
      rating: 4.4,
      reviews: 45
    },
    {
      id: 12,
      name: 'Кеды',
      brand: 'Converse',
      price: 7990,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop',
      category: 'Обувь',
      color: 'Красный',
      sizes: ['38', '39', '40', '41'],
      rating: 4.7,
      reviews: 234,
      isPopular: true
    }
  ];

  // Имитация загрузки
  useEffect(() => {
    setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Фильтр по категории
    if (selectedCategory !== 'Все' && product.category !== selectedCategory) {
      return false;
    }

    // Фильтр по брендам
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Фильтр по цене
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Фильтр по цветам
    if (selectedColors.length > 0) {
      const productColor = product.color.split('/')[0].trim();
      if (!selectedColors.includes(productColor)) {
        return false;
      }
    }

    return true;
  });

  // Сортировка
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'new':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Обработчики фильтров
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const handleResetFilters = () => {
    setSelectedCategory('Все');
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSelectedColors([]);
  };

  // Функция для отображения звезд рейтинга
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Функция для добавления в корзину
  const handleAddToCart = (product) => {
    // Получаем текущую корзину из localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = savedCart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      // Увеличиваем количество
      updatedCart = savedCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Добавляем новый товар
      updatedCart = [...savedCart, { ...product, quantity: 1 }];
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Показываем уведомление
    showNotification(`${product.name} добавлен в корзину!`);
    
    // Обновляем счетчик в заголовке
    window.dispatchEvent(new Event('cartUpdated'));
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
      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Главная</span>
          <span>/</span>
          <span className="text-purple-600 font-medium">Каталог</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Каталог товаров
          </h1>
          <p className="text-gray-600">
            Найдено товаров: <span className="font-bold text-purple-600">{filteredProducts.length}</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель фильтров */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Сбросить все
                </button>
              </div>

              {/* Категории */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Категории</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category.name
                          ? 'bg-purple-50 text-purple-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ценовой диапазон */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Цена</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>0 ₽</span>
                    <span className="font-bold">{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              {/* Бренды */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Бренды</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand.id} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => handleBrandToggle(brand.name)}
                          className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="ml-2 text-gray-700">{brand.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{brand.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цвета */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Цвета</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorToggle(color.name)}
                      className={`relative w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color.name)
                          ? 'border-purple-600 scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColors.includes(color.name) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Кнопка AI-стилиста */}
              <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2">
                <SparklesIcon className="h-5 w-5" />
                Попробовать AI-стилиста
              </button>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            {/* Панель управления */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  Фильтры
                </button>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-gray-600">
                    Показано <span className="font-bold text-purple-600">{filteredProducts.length}</span> из {allProducts.length} товаров
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Сортировка:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                  >
                    <option value="featured">По умолчанию</option>
                    <option value="new">Сначала новинки</option>
                    <option value="price-low">Сначала дешевые</option>
                    <option value="price-high">Сначала дорогие</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Мобильные фильтры */}
            {isFilterOpen && (
              <div className="lg:hidden bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Бренды</h3>
                    <div className="space-y-2">
                      {brands.slice(0, 4).map((brand) => (
                        <label key={brand.id} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.name)}
                            onChange={() => handleBrandToggle(brand.name)}
                            className="h-4 w-4 text-purple-600 rounded"
                          />
                          <span className="ml-2 text-gray-700">{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Цвета</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.slice(0, 4).map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorToggle(color.name)}
                          className={`w-6 h-6 rounded-full border ${
                            selectedColors.includes(color.name) ? 'border-purple-600 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Карточки товаров */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">Товары не найдены</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Попробуйте изменить параметры фильтрации
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    {/* Изображение */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Бейджи */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            НОВИНКА
                          </span>
                        )}
                        {product.discount && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            -{product.discount}%
                          </span>
                        )}
                        {product.isPopular && (
                          <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                            ПОПУЛЯРНО
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Информация */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {product.category}
                        </span>
                        {renderStars(product.rating)}
                      </div>

                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{product.brand} • {product.color}</p>

                      {/* Цена */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="text-sm font-bold text-red-500">
                              -{product.discount}%
                            </span>
                          </>
                        )}
                      </div>

                      {/* Кнопки */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                        >
                          В корзину
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Пагинация */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Назад
                  </button>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`px-4 py-2 rounded-lg transition ${
                        num === 1
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Далее
                  </button>
                </nav>
              </div>
            )}

            {/* AI-рекомендации */}
            <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Нужна помощь с выбором?</h2>
              <p className="mb-6 opacity-90">
                Наш AI-стилист подберет для вас идеальные сочетания одежды на основе ваших предпочтений
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition">
                  Попробовать AI-стилиста
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
                  Смотреть образы
                </button>
              </div>
            </div>
          </div>
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

export default CatalogPage;