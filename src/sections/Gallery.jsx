import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Sarees", img: new URL("../assets/img0.jpeg", import.meta.url).href },
  { name: "Lehengas", img: new URL("../assets/img1.jpeg", import.meta.url).href },
  { name: "Suits", img: new URL("../assets/img2.jpeg", import.meta.url).href },
  { name: "Dresses", img: new URL("../assets/img3.jpeg", import.meta.url).href },
  { name: "Dupattas", img: new URL("../assets/img4.jpeg", import.meta.url).href },
  { name: "Fabrics", img: new URL("../assets/img5.jpeg", import.meta.url).href }
];

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-16 bg-gray-50">

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Exclusive Collection
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate("/shop")}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
          >

            <img
              src={cat.img}
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                {cat.name}
              </h3>

              <button className="bg-white text-black px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition">
                Explore
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}