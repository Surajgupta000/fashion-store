import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function Gallery() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // Group products by category for the gallery display
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
    <div className="pt-10 pb-24 bg-[#FDFCFB] overflow-hidden">
      {/* Editorial Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold">
          Seasonal Lookbook
        </span>
        <h2 className="font-serif text-4xl md:text-6xl italic text-arinya-dark">
          The Curated Collections
        </h2>
        <div className="w-12 h-[1px] bg-arinya-dark mx-auto mt-6"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center justify-center h-[420px] md:h-[500px] gap-4">
        
        {/* Navigation - Minimalist floating arrows */}
        <button 
          onClick={prev}
          className="absolute left-4 md:left-10 z-30 p-4 border border-arinya-dark/10 rounded-full hover:bg-arinya-dark hover:text-white transition-all duration-500 hidden md:block"
        >
          <span className="text-xl">←</span>
        </button>

        {/* BACKGROUND CARD LEFT */}
        <div className="hidden lg:block opacity-30 grayscale scale-75 transition-all duration-700">
           <Card item={getItem(-2)} size="small" />
        </div>

        {/* SIDE CARD LEFT */}
        <div className="hidden md:block opacity-60 grayscale scale-90 transition-all duration-700">
          <Card item={getItem(-1)} size="medium" />
        </div>

        {/* MAIN FOCUS CARD */}
        <div className="z-20 scale-110 shadow-2xl transition-all duration-700 ease-in-out">
          <Card 
            item={getItem(0)} 
            size="large" 
            isMain 
            onClick={() => navigate(`/shop?category=${getItem(0).name}`)} 
          />
        </div>

        {/* SIDE CARD RIGHT */}
        <div className="hidden md:block opacity-60 grayscale scale-90 transition-all duration-700">
          <Card item={getItem(1)} size="medium" />
        </div>

        {/* BACKGROUND CARD RIGHT */}
        <div className="hidden lg:block opacity-30 grayscale scale-75 transition-all duration-700">
           <Card item={getItem(2)} size="small" />
        </div>

        <button 
          onClick={next}
          className="absolute right-4 md:right-10 z-30 p-4 border border-arinya-dark/10 rounded-full hover:bg-arinya-dark hover:text-white transition-all duration-500 hidden md:block"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-4 mt-12">
        {categories.map((_, i) => (
          <div 
            key={i} 
            className={`h-[2px] transition-all duration-500 ${i === index ? "w-12 bg-arinya-gold" : "w-4 bg-gray-200"}`}
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
    large: "w-72 h-[380px] md:w-[350px] md:h-[450px]"
  };

  return (
    <div 
      onClick={onClick}
      className={`${dims[size]} relative overflow-hidden group cursor-pointer rounded-sm`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
      />
      
      {/* Gradient Overlay - Deeper for the main card */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isMain ? "opacity-100" : "opacity-40"}`} />

      {/* Content Area */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">
          {item.count} Masterpieces
        </p>
        <h3 className={`font-serif italic leading-tight ${isMain ? "text-3xl md:text-4xl" : "text-xl"}`}>
          {item.name}
        </h3>
        
        {isMain && (
          <div className="mt-6 overflow-hidden">
            <button className="flex items-center gap-3 font-sans text-[10px] !text-white hover:!text-arinya-gold uppercase tracking-[0.3em] group/btn transition-colors duration-300">
              <span className="border-b border-white group-hover/btn:border-arinya-gold pb-1 transition-colors duration-300">Explore Edition</span>
              <span className="transform group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}