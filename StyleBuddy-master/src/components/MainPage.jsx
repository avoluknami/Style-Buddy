import React, { useState } from 'react';
import '../styles/App.css';
import AutoSlider from "./AutoSlider";
// Импорт компонента
import AIStylistModal from '../pages/AIStylistModal';

function App() {
  // Состояние для открытия/закрытия модального окна
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const products = [
    { id: 1, name: "Товар 1", price: "10 999 ₽", image: "/images/9.jpg" },
    { id: 2, name: "Товар 2", price: "5 999 ₽", image: "/images/8.jpg" },
    { id: 3, name: "Товар 3", price: "3 500 ₽", image: "/images/16.jpg" },
    { id: 4, name: "Товар 4", price: "12 000 ₽", image: "/images/10.jpg.webp" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      
      {/* Hero секция */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Текст */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
                  ✨ AI-стилист в вашем кармане
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Обновляйте стиль с
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    умным помощником
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  StyleBuddy подбирает идеальные сочетания одежды с помощью искусственного интеллекта. 
                  Наш AI-ассистент знает, что вам подходит лучше всего.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity font-medium text-lg flex items-center justify-center">
                    Начать покупки
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  {/* Кнопка уже настроена верно ✅ */}
                  <button 
                    onClick={() => setIsAIModalOpen(true)} 
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-purple-400 hover:text-purple-600 transition-colors font-medium text-lg"
                  >
                    Попробовать AI-стилиста
                  </button>
                </div>
              </div>

              {/* Изображение */}
              <div className="slider">
                <div className="my_slide">
                     <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <AutoSlider />
                    </div>
                </div>
                
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full opacity-10 blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Исследуйте категории
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Откройте для себя тысячи стильных товаров, подобранных специально для вас
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Одежда', count: '1,245', image: '/images/4.jpg', icon: '👗' },
            { name: 'Аксессуары', count: '543', image: '/images/2.jpg', icon: '⌚️' },
            { name: 'Обувь', count: '876', image: '/images/3.jpg', icon: '👟' },
            { name: 'Сумки', count: '321', image: '/images/17.jpg', icon:  '👜' },
            ].map((category, index) => (
            <div key={index} className="group">
                <div className="relative rounded-xl overflow-hidden aspect-square transition-all duration-300 group-hover:shadow-xl">
                <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.count} товаров</p>
                    </div>
                    <span className="text-2xl">{category.icon}</span>
                    </div>
                </div>
                </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-рекомендации */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Рекомендации от AI-стилиста</h3>
                  <p className="text-gray-600">Персональные подборки на основе вашего стиля</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: 'Для вашего гардероба', desc: 'Дополните образ идеальными аксессуарами' },
                  { title: 'Совместимость', desc: 'Эти вещи отлично сочетаются между собой' },
                  { title: 'Популярное сейчас', desc: 'То, что выбирают другие стильные люди' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsAIModalOpen(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
              >
                Получить персональные рекомендации
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Популярное сейчас</h2>
              <p className="text-gray-600">Товары, которые выбирают наши покупатели</p>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Смотреть все →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                    
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    </div>

                    <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">
                        {product.price}
                        </span>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        В корзину
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-8">
              <span className="text-purple-700 font-medium">✨ Бесплатно для первых 1000 пользователей</span>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Начните свой стиль с
              <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                StyleBuddy сегодня
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу стильных людей и получайте персональные рекомендации от нашего AI-стилиста
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-xl hover:opacity-90 transition-opacity font-medium text-lg">
                Создать аккаунт бесплатно
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl hover:border-purple-400 hover:text-purple-600 transition-colors font-medium text-lg">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          {/* ... контент футера ... */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 StyleBuddy. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* 🔥 ВОТ ОНО! ЭТОГО НЕ ХВАТАЛО! */}
      {/* Вставляем компонент модального окна перед закрывающим div */}
      <AIStylistModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />

    </div>
  );
}

export default App;