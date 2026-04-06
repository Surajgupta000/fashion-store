import { useContext } from "react";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function NewArrivals() {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  return (
    <div className="px-6 py-20 bg-[#EADFD6]">

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        New Arrivals
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {products.map((p) => (
          <div
            key={p.id}
            className="group card overflow-hidden transition duration-300"
          >

            {/* Image */}
            <div className="relative overflow-hidden rounded-t-[50px]">
              <img
                src={p.image}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Heart Icon */}
              <div
                onClick={() => toggleWishlist(p)}
                className="absolute top-3 right-3 text-xl cursor-pointer"
              >
                {isInWishlist(p.id) ? "❤️" : "🤍"}
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => addToCart(p)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 
                           bg-black text-white px-4 py-1 rounded-full text-sm
                           opacity-0 group-hover:opacity-100 transition"
              >
                Quick Add
              </button>
            </div>

            {/* Info */}
            <div className="p-4">

              <p className="text-sm text-gray-500">
                {p.brand}
              </p>

              <h3 className="font-semibold">
                {p.name}
              </h3>

              <p className="mt-1 font-bold">
                ₹{p.price}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}