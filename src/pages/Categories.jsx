import { useLocation, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const categories = [
  {
    name: "Sarees",
    image: products.find(p => p.category === "Sarees")?.image || ""
  },
  {
    name: "Lehengas",
    image: products.find(p => p.category === "Lehengas")?.image || ""
  },
  {
    name: "Suits",
    image: products.find(p => p.category === "Suits")?.image || ""
  },
  {
    name: "Dresses",
    image: products.find(p => p.category === "Dresses")?.image || ""
  },
  {
    name: "Dupattas",
    image: products.find(p => p.category === "Dupattas")?.image || ""
  },
  {
    name: "Fabrics",
    image: products.find(p => p.category === "Fabrics")?.image || ""
  }
];

export default function Categories() {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type");

  // 🔥 Filter products
  const filteredProducts = type
    ? products.filter((p) => p.category === type)
    : [];

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">

      {/* ✅ CASE 1: SHOW CATEGORY GRID */}
      {!type && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Categories
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/categories?type=${cat.name}`)}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
              >

                <img
                  src={cat.image}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-xl font-semibold">
                    {cat.name}
                  </h2>
                </div>

              </div>
            ))}

          </div>
        </>
      )}

      {/* ✅ CASE 2: SHOW PRODUCTS */}
      {type && (
        <>
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            {type}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >

                {/* Image */}
                <div className="relative overflow-hidden">
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

                  {/* Quick Add */}
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
                  <p className="text-sm text-gray-500">{p.brand}</p>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="font-bold mt-1">₹{p.price}</p>
                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </div>
  );
}