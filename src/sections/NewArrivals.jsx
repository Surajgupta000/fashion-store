import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

export default function NewArrivals() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="px-6 py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {products.map((p, index) => (
          <div key={p.id || index} className="group border rounded-xl p-3">

            <img
              src={p.image}
              className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-lg"
            />

            <h3 className="mt-3 font-semibold">{p.name}</h3>
            <p className="text-gray-500">{p.brand}</p>
            <p className="font-bold">₹{p.price}</p>

            <button
              onClick={() => addToCart(p)}
              className="hidden group-hover:block mt-2 bg-black text-white px-4 py-1 rounded"
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}