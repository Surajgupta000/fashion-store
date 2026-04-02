import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990"
];

export default function InfoSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-16 max-w-7xl mx-auto">

      {/* LEFT TEXT */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Style That Speaks Elegance
        </h2>

        <p className="text-gray-600 mb-6">
          Discover handpicked collections designed for modern women.
          From traditional sarees to trendy dresses — we bring fashion to life.
        </p>

        <button className="bg-black text-white px-6 py-2 rounded-full">
          Explore More
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1">
        <img
          src={images[index]}
          className="rounded-2xl w-full h-56 sm:h-72 md:h-96 object-cover transition-all duration-700"
        />
      </div>

    </div>
  );
}