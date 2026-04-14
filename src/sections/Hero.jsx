import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  new URL("../assets/Anarkali suit.jpg", import.meta.url).href,
  new URL("../assets/Mens serwani.jpeg", import.meta.url).href,
  new URL("../assets/Lehenga.jpg", import.meta.url).href,
  new URL("../assets/sare2.jpg", import.meta.url).href,
  new URL("../assets/Full sleeve dress.jpg", import.meta.url).href,
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative bg-neutral-950">
      {/* Background Images with Cross-Fade & Slow Zoom */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Arinya Shree Collection"
            className={`w-full h-full object-cover transform transition-transform duration-[6000ms] ease-out ${
              i === index ? "scale-105" : "scale-125"
            }`}
          />
        </div>
      ))}

      {/* Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white pt-20 md:pt-0">
        
        {/* Subtle Top Label */}
        <span className="uppercase tracking-[0.4em] text-[9px] md:text-xs mb-4 opacity-80 font-light">
          The Heritage Collection
        </span>
        
        {/* Main Headline - Responsive Scaling */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif leading-tight mb-6 max-w-5xl">
          <span className="italic font-light">Timeless</span> Couture <br /> 
          <span className="text-xl sm:text-3xl md:text-5xl block mt-2 font-light tracking-wide">
            For the Modern Individual
          </span>
        </h1>

        {/* Categories - Responsive Visibility */}
        <p className="text-[9px] md:text-sm mb-10 tracking-[0.2em] text-gray-300 uppercase font-light max-w-[280px] md:max-w-none">
          Menswear • Bridal • Occasion Wear • Handcrafted Luxury
        </p>

        {/* Premium Call to Action - Using btn-accent with black text */}
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            onClick={() => navigate("/shop")}
            className="btn-accent px-8 py-4 md:px-12 md:py-5 text-[#0F0F0F] text-[11px] md:text-xs uppercase tracking-[0.3em] font-bold shadow-2xl transition-all active:scale-95"
          >
            Explore the Collection
          </button>
        </div>
      </div>

      {/* Bottom Navigation Indicators - Responsive spacing */}
      <div className="absolute bottom-10 md:bottom-12 left-0 w-full flex justify-center items-center gap-3 md:gap-4 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === index ? "w-10 md:w-12 h-[2px] bg-white" : "w-5 md:w-6 h-[1px] bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}