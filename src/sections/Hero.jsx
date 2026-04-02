import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  new URL("../assets/img0.jpeg", import.meta.url).href,
  new URL("../assets/img1.jpeg", import.meta.url).href,
  new URL("../assets/img2.jpeg", import.meta.url).href,
  new URL("../assets/img3.jpeg", import.meta.url).href,
  new URL("../assets/img4.jpeg", import.meta.url).href,
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Discover Elegant <br /> Women Collection
        </h1>

        <p className="mb-6 text-sm md:text-lg text-gray-200">
          Sarees • Lehengas • Dresses • Premium Styles
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Explore Collection
        </button>

      </div>
    </div>
  );
}