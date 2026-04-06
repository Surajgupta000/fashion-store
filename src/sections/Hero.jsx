import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  new URL("../assets/Anarkali suit.jpg", import.meta.url).href,
  new URL("../assets/Full sleeve dress.jpg", import.meta.url).href,
  new URL("../assets/Lehenga.jpg", import.meta.url).href,
  new URL("../assets/sare2.jpg", import.meta.url).href,
  new URL("../assets/Mens serwani.jpeg", import.meta.url).href,
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const zoomIn = setInterval(() => {
      setZoom(true);

      setTimeout(() => {
        setZoom(false);
      }, 2000);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 4000);

    }, 4000);

    return () => clearInterval(zoomIn);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative">

      {/* Background Image */}
      <img
        src={images[index]}
        className={`absolute w-full h-full object-contain md:object-cover transition-transform duration-[4000ms] ${
          zoom ? "scale-110" : "scale-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">

        <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4">
          Timeless Elegance <br /> For Every Woman
        </h1>

        <p className="text-sm md:text-lg mb-6 text-gray-200">
          Sarees • Lehengas • Dresses • Premium Styles
        </p>

        {/* Premium Button */}
        <button
          onClick={() => navigate("/shop")}
          className="btn-accent shadow-lg"
        >
          Explore Collection →
        </button>

      </div>
    </div>
  );
}