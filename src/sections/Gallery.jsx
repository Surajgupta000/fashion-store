import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function Gallery() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 Create categories dynamically from products
  const categoryMap = {};

  products.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = {
        name: p.category,
        image: p.image,
        count: 0
      };
    }
    categoryMap[p.category].count++;
  });

  const categories = Object.values(categoryMap);

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🎯 Navigation logic
  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const getItem = (offset) => {
    return categories[
      (index + offset + categories.length) % categories.length
    ];
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  return (
    <div className="py-20 bg-[var(--color-bg-light)] text-center">

      <h2 className="text-3xl md:text-5xl font-bold mb-12">
        Exclusive Collections
      </h2>

      <div
        className="flex items-center justify-center gap-2 md:gap-4"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >

        {/* LEFT ARROW - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={prev}
            className="text-2xl md:text-4xl p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-110 transform"
          >
            ←
          </button>
        )}

        {/* LEFT BLUR CARD */}
        <Card item={getItem(-2)} blur />

        {/* FOCUS CARDS */}
        <Card item={getItem(-1)} focus navigate={navigate} />
        <Card item={getItem(0)} focus main navigate={navigate} />
        <Card item={getItem(1)} focus navigate={navigate} />

        {/* RIGHT BLUR CARD */}
        <Card item={getItem(2)} blur />

        {/* RIGHT ARROW - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={next}
            className="text-2xl md:text-4xl p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-110 transform"
          >
            →
          </button>
        )}

      </div>
    </div>
  );
}

/* 💎 Card Component */
function Card({ item, main, focus, blur, navigate }) {
  return (
    <div
      onClick={() =>
        main && navigate(`/categories?type=${item.name}`)
      }
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500
        ${main ? "w-64 h-80 md:w-80 md:h-96 scale-110 shadow-2xl" : ""}
        ${focus ? "w-48 h-72 md:w-56 md:h-80 scale-105 shadow-lg" : ""}
        ${blur ? "w-32 h-48 md:w-40 md:h-56 opacity-50 blur-sm" : ""}
      `}
    >
      <img
        src={item.image}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">

        <h3 className={`font-semibold ${main ? "text-xl" : focus ? "text-lg" : "text-sm"}`}>
          {item.name}
        </h3>

        <p className={`text-sm ${main ? "text-base" : "text-xs"}`}>
          {item.count} items
        </p>

        {/* Luxury Button for Main */}
        {main && (
          <button className="mt-3 bg-white/90 backdrop-blur-sm text-black px-3 py-2 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform text-sm">
            Get inside
          </button>
        )}

      </div>
    </div>
  );
}