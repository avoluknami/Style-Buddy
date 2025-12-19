// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  CogIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  ArrowLeftOnRectangleIcon,
  XMarkIcon // Добавьте эту строку
} from '@heroicons/react/24/outline';

const UserProfile = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('authChange'));
    onClose();
    alert('Вы успешно вышли из аккаунта!');
  };

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: UserIcon },
    { id: 'orders', label: 'Заказы', icon: ShoppingBagIcon },
    { id: 'wishlist', label: 'Избранное', icon: HeartIcon },
    { id: 'settings', label: 'Настройки', icon: CogIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gradient-to-b from-purple-50 to-pink-50 p-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition mt-8"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                Выйти
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Мой профиль</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {user.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      {user.phone || 'Не указан'}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">История активности</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm">Вы вошли в систему</p>
                        <p className="text-xs text-gray-500">Сегодня, 10:30</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm">Просмотрено товаров: 12</p>
                        <p className="text-xs text-gray-500">За последние 7 дней</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Мои заказы</h2>
                <div className="text-center py-12">
                  <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">У вас пока нет заказов</p>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Избранное</h2>
                <div className="text-center py-12">
                  <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">В избранном пока ничего нет</p>
                  <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg">
                    Перейти в каталог
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Настройки</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Уведомления
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span>Email уведомления</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span>СМС уведомления</span>
                      </label>
                    </div>
                  </div>
                  
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg">
                    Сохранить настройки
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;