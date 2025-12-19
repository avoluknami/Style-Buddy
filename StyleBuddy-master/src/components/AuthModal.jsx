// AuthModal.jsx
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
      }
      if (!formData.phone) {
        newErrors.phone = 'Телефон обязателен';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // В реальном приложении здесь был бы запрос к API
      // Для демо используем localStorage
      
      if (isLogin) {
        // Логин
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
          u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          // Сохраняем данные пользователя
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', 'true');
          
          // Вызываем событие для обновления UI
          window.dispatchEvent(new Event('authChange'));
          
          alert(`Добро пожаловать, ${user.name}!`);
          onClose();
        } else {
          setErrors({ general: 'Неверный email или пароль' });
        }
      } else {
        // Регистрация
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Проверяем, нет ли пользователя с таким email
        if (users.some(u => u.email === formData.email)) {
          setErrors({ email: 'Пользователь с таким email уже существует' });
          setLoading(false);
          return;
        }
        
        const newUser = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Автоматически входим после регистрации
        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        window.dispatchEvent(new Event('authChange'));
        
        alert(`Регистрация успешна! Добро пожаловать, ${newUser.name}!`);
        onClose();
      }
    } catch (error) {
      setErrors({ general: 'Произошла ошибка. Попробуйте снова.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
          {/* Закрыть */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          {/* Заголовок */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-2">
              {isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {isLogin 
                ? 'Введите свои данные для входа' 
                : 'Зарегистрируйтесь для доступа ко всем функциям'}
            </p>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Иван Иванов"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7 (999) 999-99-99"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    Забыли пароль?
                  </button>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isLogin ? 'Вход...' : 'Регистрация...'}
                  </span>
                ) : (
                  isLogin ? 'Войти' : 'Зарегистрироваться'
                )}
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Или</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Продолжить с Google
              </button>
              
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  {isLogin 
                    ? 'Нет аккаунта? Зарегистрироваться' 
                    : 'Уже есть аккаунт? Войти'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="#" className="text-purple-600 hover:underline">
                Условиями использования
              </a>{' '}
              и{' '}
              <a href="#" className="text-purple-600 hover:underline">
                Политикой конфиденциальности
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;