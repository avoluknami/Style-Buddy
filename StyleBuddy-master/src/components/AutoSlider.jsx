import { useEffect, useState } from "react";
import "./slider.css";

const images = [
  "/images/1.jpg",
  "/images/12.jpeg",
  "/images/13.jpeg",
  "/images/14.jpeg",
  "/images/15.jpeg",
];

export default function AutoSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000); // фото стоит 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="slide" key={i}>
            <img src={src} alt="slide" className="slide-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
