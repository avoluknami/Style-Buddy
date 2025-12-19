import React from 'react';

const styles = [
  { id: 1, title: "Casual", image: "/images/casual.jpg", desc: "Комфорт и простота на каждый день — удобно, легко и стильно без лишних усилий." },
  { id: 2, title: "Streetwear", image: "/images/streatwear.jpg", desc: "Свободные силуэты, уверенность и дерзкий вайб — стиль уличной культуры." },
  { id: 3, title: "Business", image: "/images/business.jpg", desc: "Строгость, элегантность и уверенность — идеальный образ для работы и важных встреч." },
  { id: 4, title: "Sport Chic", image: "/images/sportchic.jpg", desc: "Комфорт спортивной одежды, объединенный с женственностью и стилем." },
  { id: 5, title: "Classic", image: "/images/classic.png", desc: "Вечная элегантность, утончённые формы и универсальность на все случаи жизни." },
  { id: 6, title: "Minimalism", image: "/images/minimalism.jpg", desc: "Чистые линии, спокойные оттенки и красота в простоте." }
];

const StylesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          СТРАНИЦА СТИЛЕЙ
        </h1>

        <p className="text-center text-gray-600 mb-12">
        🎩 Здесь ты найдёшь подборки образов для разных настроений и случаев. <br />
        Исследуй стили, вдохновляйся и находи свой! 👚
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styles.map((style) => (
            <div
              key={style.id}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
            >
              <img
                src={style.image}
                alt={style.title}
                className="w-full h-90 object-cover rounded-lg mb-4"
              />

              <h2 className="text-xl font-semibold text-purple-600 text-center">
                {style.title}
              </h2>

              <p className="text-gray-600 mb-4 text-center">
                {style.desc}
              </p>

              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                Посмотреть
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StylesPage;
