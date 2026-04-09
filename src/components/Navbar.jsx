import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import products from "../data/products";

export default function Navbar() {
  const { cart, setIsOpen } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Search Logic
  const categories = [...new Set(products.map(p => p.category))];
  const filteredCategories = categories.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  const filteredProducts = search.trim() ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
    }
    if (showSearch) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return (
    <div className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-[100] border-b border-gray-100">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group shrink-0">
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-arinya-dark">ARINYA</span>
          <span className="font-sans text-[7px] md:text-[9px] tracking-[0.5em] uppercase text-arinya-gold -mt-1">Shree</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-widest text-arinya-dark">
          <Link to="/" className="hover:text-arinya-gold transition-colors">Home</Link>
          <Link to="/gallery" className="hover:text-arinya-gold transition-colors">Shop</Link>
          <Link to="/categories" className="hover:text-arinya-gold transition-colors">Categories</Link>
          <Link to="/arrivals" className="hover:text-arinya-gold transition-colors">Arrivals</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6 relative">
          
          {/* 🔍 SEARCH BLOCK */}
          <div className="relative" ref={searchRef}>
            <button onClick={() => setShowSearch(!showSearch)} className="hover:scale-110 transition">
              <Search className="w-5 h-5" />
            </button>

            {showSearch && (
              <div className="absolute right-[-100px] md:right-0 mt-6 w-[85vw] md:w-80 bg-white border border-gray-100 shadow-2xl p-4 rounded-sm">
                <input
                  type="text"
                  placeholder="Search masterpieces..."
                  className="w-full font-serif italic border-b border-gray-200 pb-2 mb-4 outline-none focus:border-arinya-gold"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <div className="max-h-64 overflow-y-auto">
                  {filteredCategories.map((c, i) => (
                    <div key={i} onClick={() => { navigate(`/categories?type=${c}`); setShowSearch(false); setSearch(""); }} className="p-2 text-xs uppercase tracking-widest hover:bg-gray-50 cursor-pointer">{c}</div>
                  ))}
                  {filteredProducts.map((p) => (
                    <div key={p.id} onClick={() => { navigate(`/product/${p.id}`); setShowSearch(false); setSearch(""); }} className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer">
                      <img src={p.image} className="w-8 h-10 object-cover" />
                      <span className="text-xs font-sans">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/wishlist" className="relative hover:scale-110 transition">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "fill-arinya-red text-arinya-red" : ""}`} />
          </Link>

          <button onClick={() => setIsOpen(true)} className="relative hover:scale-110 transition">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-arinya-gold text-black text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
          </button>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[110] flex flex-col p-10 gap-8 transition-transform duration-500 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="self-end" onClick={() => setMenuOpen(false)}><X className="w-8 h-8" /></button>
        <div className="flex flex-col gap-6 font-serif text-3xl italic">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)}>Collections</Link>
          <Link to="/arrivals" onClick={() => setMenuOpen(false)}>New Drops</Link>
        </div>
      </div>
    </div>
  );
}