import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ShoppingCart, Star } from "lucide-react";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="rounded-3xl bg-[#F7F3EE] p-10 text-center text-gray-700">
          <p className="text-xl font-semibold mb-3">No favorites yet.</p>
          <p>Tap the heart icon on any dress to save it here and add it to cart later.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 bg-white rounded-3xl shadow-sm overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-80 w-full md:w-72 object-cover"
              />

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-600">
                      {item.category}
                    </span>

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="text-2xl leading-none"
                      aria-label="Remove from wishlist"
                    >
                      ❤️
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{item.brand}</p>

                  <div className="flex items-center gap-2 text-yellow-500 mb-5">
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                    <Star className="w-4 h-4 opacity-50" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>

                  <p className="text-3xl font-bold">₹{item.price}</p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
