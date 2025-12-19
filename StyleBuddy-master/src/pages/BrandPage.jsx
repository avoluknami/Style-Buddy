// BrandsPage.jsx
import React, { useState } from 'react';

const BrandsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const brands = [
    {
      id: 1,
      name: 'ZARA',
      description: 'Испанский бренд, известный современными трендами по доступным ценам',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg',
      category: 'Повседневная одежда',
    },
    {
      id: 2,
      name: 'H&M',
      description: 'Шведский ритейлер, предлагающий модную одежду для всей семьи',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png',
      category: 'Экологичная мода'
    },
    {
      id: 3,
      name: 'Ralph Lauren',
      description: 'Американский люксовый бренд, символ роскоши и высокой моды',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbfwez9DK2s1a9ZyZ3OHGRTzlp59fGV1LAbA&s',
      category: 'Люкс'
    },
    {
      id: 4,
      name: 'Nike',
      description: 'Мировой лидер в производстве спортивной одежды и обуви',
      logo: 'https://sneakertown.kz/upload/iblock/11b/11b6091e46bdf1a239b576aa695eb6a9.png',
      category: 'Спорт'
    },
    {
      id: 5,
      name: 'Adidas',
      description: 'Немецкий производитель спортивной одежды и обуви',
      logo: 'https://cdn.aboutstatic.com/file/57fb78383a938b7df17cc09d105f717c.png?quality=75&transparent=1&trim=1&height=480&width=360',
      category: 'Спорт'
    },
    {
      id: 6,
      name: 'Uniqlo',
      description: 'Японский бренд, известный качественными базовыми вещами',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/1200px-UNIQLO_logo.svg.png',
      category: 'Повседневная одежда'
    },
    {
      id: 7,
      name: 'Brunello Cucinelli',
      description: 'Итальянский модный дом, специализирующийся на люксовой одежде',
      logo: 'https://images.seeklogo.com/logo-png/22/1/brunello-cucinelli-logo-png_seeklogo-222974.png',
      category: 'Люкс'
    },
    {
      id: 8,
      name: 'Levi\'s',
      description: 'Американский бренд, легендарный производитель джинсовой одежды',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliRajVrNqm0o-ve9efmQAT0NXgH46kDXO2A&s',
      category: 'Повседневная одежда'
    },
    {
      id: 9,
      name: 'Chanel',
      description: 'Французский дом моды, символ элегантности и изысканности',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Q-JLS1cnLGkOmLAgRbo4rO0moCZ34HF-SA&s',
      category: 'Люкс'
    },
    {
      id: 10,
      name: 'Tommy Hilfiger',
      description: 'Американский бренд в стиле преппи и casual одежды',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Tommy-Hilfiger-Logo.png',
      category: 'Повседневная одежда'
    },
    {
      id: 11,
      name: 'Puma',
      description: 'Немецкий производитель спортивной одежды и обуви',
      logo: 'https://ae.puma.com/media/custom_images/puma-og-logo.png',
      category: 'Спорт'
    },
    {
      id: 12,
      name: 'Patagonia',
      description: 'Американский бренд экологичной одежды для активного отдыха',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuXymiPFxdvfkfwXe2NvyE8spp4R3cD-5Zg&s',
      category: 'Экологичная мода'
    }
  ];

  // Функция фильтрации брендов
  const filteredBrands = selectedCategory === 'Все' 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  // Категории для фильтров
  const categories = ['Все', 'Люкс', 'Спорт', 'Повседневная одежда', 'Экологичная мода'];

  // Функция для получения цвета категории
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Люкс': return 'bg-yellow-100 text-yellow-800';
      case 'Спорт': return 'bg-blue-100 text-blue-800';
      case 'Повседневная одежда': return 'bg-green-100 text-green-800';
      case 'Экологичная мода': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-purple-100 text-purple-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Бренды
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Откройте для себя лучшие мировые бренды одежды и аксессуаров. 
            Каждый бренд имеет свою уникальную историю и философию.
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category === 'Все' ? 'Все бренды' : category}
            </button>
          ))}
        </div>

        {/* Счетчик найденных брендов */}
        <div className="mb-6 text-center">
          <p className="text-gray-500">
            Найдено брендов: <span className="font-bold text-purple-600">{filteredBrands.length}</span>
          </p>
        </div>

        {/* Сетка брендов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div 
              key={brand.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
            >
              {/* Логотип бренда - УБРАН СЕРЫЙ ФОН И ТЕКСТ */}
              <div className="h-40 flex items-center justify-center p-4 bg-white">
                <img 
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-24 max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/150x80/F3F4F6/374151?text=${brand.name}`;
                  }}
                />
              </div>

              {/* Информация о бренде */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(brand.category)}`}>
                    {brand.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition transform hover:-translate-y-0.5">
                    Смотреть коллекцию
                  </button>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет брендов в категории */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Бренды не найдены</h3>
            <p className="text-gray-500 mb-6">
              В категории "{selectedCategory}" пока нет брендов. Попробуйте выбрать другую категорию.
            </p>
            <button 
              onClick={() => setSelectedCategory('Все')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition"
            >
              Показать все бренды
            </button>
          </div>
        )}

        {/* Статистика */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{brands.length}+</div>
            <div className="text-gray-600">Брендов в каталоге</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">20+</div>
            <div className="text-gray-600">Страны представления</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-600">Проверенное качество</div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Не нашли нужный бренд?
          </h2>
          <p className="text-gray-600 mb-6">
            Наш AI-стилист поможет подобрать альтернативные варианты
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition inline-flex items-center transform hover:-translate-y-0.5">
            <span>Попросить рекомендацию у AI-стилиста</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;