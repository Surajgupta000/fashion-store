import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function Gallery() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (event) => {
    touchEndX.current = null;
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < minSwipeDistance) return;
    if (distance > 0) {
      next();
    } else {
      prev();
    }
  };

  // Group products by category
  const categoryMap = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { name: p.category, image: p.image, count: 0 };
    }
    acc[p.category].count++;
    return acc;
  }, {});

  const categories = Object.values(categoryMap);

  const next = () => setIndex((prev) => (prev + 1) % categories.length);
  const prev = () => setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));

  const getItem = (offset) => {
    const i = (index + offset + categories.length) % categories.length;
    return categories[i];
  };

  return (
    <div className="py-16 md:py-24 bg-[#FDFCFB] overflow-hidden">
      {/* Editorial Header */}
      <div className="text-center mb-12 md:mb-16 space-y-4 px-6">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold font-bold">
          Seasonal Lookbook
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl italic text-arinya-dark">
          The Curated Collections
        </h2>
        <div className="w-12 h-[1px] bg-arinya-dark mx-auto mt-6"></div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative flex items-center justify-center h-[400px] sm:h-[450px] md:h-[550px] w-full max-w-[1400px] mx-auto px-4"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Navigation Arrows - Desktop Only */}
        <button 
          onClick={prev}
          className="absolute left-4 lg:left-10 z-30 p-4 border border-arinya-dark/10 rounded-full hover:bg-arinya-dark hover:text-white transition-all duration-500 hidden lg:block"
        >
          <span className="text-xl">←</span>
        </button>

        {/* BACKGROUND CARD LEFT (Desktop Only) */}
        <div className="hidden xl:block opacity-20 grayscale scale-75 transition-all duration-700 blur-[1px]">
           <Card item={getItem(-2)} size="small" />
        </div>

        {/* SIDE CARD LEFT (Tablet/Desktop) */}
        <div className="hidden md:block opacity-40 grayscale scale-90 transition-all duration-700">
          <Card item={getItem(-1)} size="medium" />
        </div>

        {/* MAIN FOCUS CARD (Mobile Friendly) */}
        <div className="z-20 scale-100 sm:scale-105 md:scale-110 shadow-2xl transition-all duration-700 ease-in-out px-4 sm:px-0">
          <Card 
            item={getItem(0)} 
            size="large" 
            isMain 
            onClick={() => navigate(`/categories?type=${getItem(0).name}`)} 
          />
        </div>

        {/* SIDE CARD RIGHT (Tablet/Desktop) */}
        <div className="hidden md:block opacity-40 grayscale scale-90 transition-all duration-700">
          <Card item={getItem(1)} size="medium" />
        </div>

        {/* BACKGROUND CARD RIGHT (Desktop Only) */}
        <div className="hidden xl:block opacity-20 grayscale scale-75 transition-all duration-700 blur-[1px]">
           <Card item={getItem(2)} size="small" />
        </div>

        <button 
          onClick={next}
          className="absolute right-4 lg:right-10 z-30 p-4 border border-arinya-dark/10 rounded-full hover:bg-arinya-dark hover:text-white transition-all duration-500 hidden lg:block"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Mobile Navigation Helpers */}
      <div className="flex lg:hidden justify-center items-center gap-10 mt-10">
         <button onClick={prev} className="text-arinya-dark p-2">← Prev</button>
         <div className="flex gap-3">
            {categories.map((_, i) => (
              <div 
                key={i} 
                className={`h-[2px] transition-all duration-500 ${i === index ? "w-8 bg-arinya-gold" : "w-2 bg-gray-200"}`}
              />
            ))}
         </div>
         <button onClick={next} className="text-arinya-dark p-2">Next →</button>
      </div>

      {/* Progress Line (Desktop Only) */}
      <div className="hidden lg:flex justify-center gap-4 mt-16">
        {categories.map((_, i) => (
          <div 
            key={i} 
            className={`h-[2px] transition-all duration-500 ${i === index ? "w-16 bg-arinya-gold" : "w-4 bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, size, isMain, onClick }) {
  const dims = {
    small: "w-32 h-48",
    medium: "w-56 h-80",
    large: "w-[85vw] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[350px] md:h-[480px]"
  };

  return (
    <div 
      onClick={onClick}
      className={`${dims[size]} relative overflow-hidden group cursor-pointer rounded-sm border border-black/5`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isMain ? "opacity-100" : "opacity-40"}`} />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
        <p className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">
          {item.count} Masterpieces
        </p>
        <h3 className={`font-serif italic leading-tight mb-4 ${isMain ? "text-2xl md:text-4xl" : "text-lg"}`}>
          {item.name}
        </h3>
        
        {isMain && (
          <div className="mt-2">
            {/* Keeping text white for image contrast, using luxury underline style */}
            <div className="inline-flex items-center gap-2 group/btn cursor-pointer">
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] border-b border-white pb-1 group-hover/btn:text-arinya-gold group-hover/btn:border-arinya-gold transition-all duration-300">
                Explore Edition
              </span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}