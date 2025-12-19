import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AIStylistModal = ({ isOpen, onClose }) => {
  // 1. Состояние чата (начальное сообщение от бота)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Привет! Я AI-стилист StyleBuddy ✨. Помогу подобрать образ, найти сочетания или подскажу тренды. Что ищем сегодня?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 2. Автоскролл вниз при появлении новых сообщений
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Если модалка закрыта, ничего не рендерим
  if (!isOpen) return null;

  // 3. Логика отправки сообщения
  const handleSend = async (e) => {
    console.log("КЛЮЧ:", process.env.REACT_APP_GROQ_API_KEY);
    e.preventDefault();
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error('Ключ API не найден! Проверь файл .env');
      }

      // Отправляем запрос на сервера Groq
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
         model: "llama-3.3-70b-versatile", // Очень быстрая и бесплатная модель
          messages: [
            {
              role: "system",
              content: `Ты — профессиональный стилист модного интернет-магазина StyleBuddy. 
              Твоя задача — помогать клиентам подбирать одежду, давать советы по стилю и комбинированию цветов.
              Тон общения: дружелюбный, модный, экспертный, используй эмодзи.
              Отвечай кратко (не более 3-4 предложений), если не просят подробностей.
              Язык ответов: Русский.`
            },
            // История переписки для контекста
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: "user", content: input }
          ],
          temperature: 0.7, // Креативность (0.0 - робот, 1.0 - фантазер)
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка сети или неверный ключ');
      }

      const data = await response.json();
      const aiResponseText = data.choices[0].message.content;

      // Добавляем ответ ИИ
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error('Ошибка:', error);
      setMessages(prev => [...prev, { 
        id: Date.now()+1, 
        sender: 'ai', 
        text: 'Упс! Модный процессор перегрелся 🤯. Проверь консоль или попробуй позже.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Затемнение фона (Overlay) */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Окно чата */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md h-[650px] flex flex-col overflow-hidden animate-fade-in-up">
          
          {/* Шапка (Header) */}
          <div className="p-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex justify-between items-center text-white shadow-md z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
                <SparklesIcon className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">StyleBuddy AI</h3>
                <p className="text-xs text-purple-100 font-medium">Работает на Groq ⚡️</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Область сообщений (Chat Area) */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Аватарка для AI */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-1">
                    AI
                  </div>
                )}
                
                {/* Пузырь сообщения */}
                <div 
                  className={`max-w-[80%] p-3.5 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-purple-600 text-white rounded-2xl rounded-br-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Анимация загрузки (три точки) */}
            {isLoading && (
              <div className="flex justify-start items-center">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                    AI
                  </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода (Input) */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Спроси: 'Что надеть на вечеринку?'..."
                className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-700 placeholder-gray-400"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <PaperAirplaneIcon className="w-5 h-5 -rotate-45 translate-x-[-1px] translate-y-[1px]" />
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AIStylistModal;