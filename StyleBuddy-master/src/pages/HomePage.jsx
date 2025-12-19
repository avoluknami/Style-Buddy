import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  TagIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {

    // <div className="bg-purple-600 text-white p-4 rounded-lg text-center m-4">
    //     Tailwind работает! 🎉
    //   </div>
  const categories = [
    { name: 'Одежда', count: 1245, color: 'from-blue-500 to-cyan-500' },
    { name: 'Обувь', count: 876, color: 'from-purple-500 to-pink-500' },
    { name: 'Аксессуары', count: 543, color: 'from-orange-500 to-red-500' },
    { name: 'Сумки', count: 321, color: 'from-green-500 to-emerald-500' },
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI Стилист',
      description: 'Искусственный интеллект подберет идеальные сочетания'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Гарантия качества',
      description: 'Все товары проходят проверку перед отправкой'
    },
    {
      icon: TruckIcon,
      title: 'Быстрая доставка',
      description: 'Доставка за 1-2 дня в любой город'
    },
    {
      icon: TagIcon,
      title: 'Лучшие цены',
      description: 'Система мониторинга цен и скидки до 70%'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero секция */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Обновляйте свой стиль с
              <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                StyleBuddy AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Умный маркетплейс, где искусственный интеллект помогает создавать 
              идеальные образы и находить стильные сочетания
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                Начать покупки
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Узнать о AI-стилисте
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Популярные категории
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-8 cursor-pointer transition-transform hover:scale-105`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80">
                  {category.count} товаров
                </p>
                <div className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg className="w-32 h-32" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Почему выбирают StyleBuddy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 mb-6">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Готовы обновить гардероб?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Присоединяйтесь к миллионам пользователей, которые уже доверяют 
              выбор своего стиля искусственному интеллекту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-white text-purple-600 hover:bg-gray-100 transition-colors"
              >
                Создать аккаунт
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border-2 border-white hover:bg-white/10 transition-colors"
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;