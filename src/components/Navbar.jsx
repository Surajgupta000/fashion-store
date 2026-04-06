import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import products from "../data/products";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { cart, setIsOpen } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔍 Search State
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  // 🔥 Categories from products
  const categories = [...new Set(products.map(p => p.category))];

  const filteredCategories = categories.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = search.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">

      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/">
          <img 
            src={logo} 
            alt="Arinya Shree" 
            className="h-12 bg-white object-contain rounded-md" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link to="/">Home</Link>
          <Link to="/gallery">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/arrivals">Arrivals</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl relative">

          {/* 🔍 SEARCH */}
          <div className="relative">

            <div
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-5 h-5" />
            </div>

            {showSearch && (
              <div className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-md border rounded-xl shadow-xl p-4 z-50">

                <input
                  type="text"
                  placeholder="Search outfits..."
                  className="w-full border p-2 rounded mb-3 outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto">

                  {/* Categories */}
                  {filteredCategories.length > 0 && (
                    <>
                      <p className="text-xs text-gray-400 mb-1">
                        Categories
                      </p>

                      {filteredCategories.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            navigate(`/categories?type=${c}`);
                            setShowSearch(false);
                            setSearch("");
                          }}
                          className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          {c}
                        </div>
                      ))}
                    </>
                  )}

                  {/* Products */}
                  {search.trim() && filteredProducts.length > 0 && (
                    <>
                      <p className="text-xs text-gray-400 mt-3 mb-1">
                        Matching products
                      </p>

                      {filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate(`/categories?type=${p.category}`);
                            setShowSearch(false);
                            setSearch("");
                          }}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <img
                            src={p.image}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span>{p.name}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {search.trim() && filteredProducts.length === 0 && (
                    <div className="p-2 text-sm text-gray-500">
                      No matching products found.
                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

          {/* ❤️ Wishlist */}
          <div
            className="relative cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/wishlist")}
            aria-label="Open wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* 🛒 Cart */}
          <div
            className="relative cursor-pointer hover:scale-110 transition"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white">
          <Link to="/">Home</Link>
          <Link to="/gallery">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/arrivals">Arrivals</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
      )}

    </div>
  );
}