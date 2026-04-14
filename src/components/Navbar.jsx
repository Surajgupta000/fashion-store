import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/gallery" },
    { name: "Collections", path: "/categories" },
    { name: "Arrivals", path: "/arrivals" },
    { name: "Wishlist", path: "/wishlist" }
  ];

  const categories = [...new Set(products.map((p) => p.category))];
  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );
  const filteredProducts = search.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setShowSearch(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-[100] border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto h-16 md:h-20">

        {/* --- LOGO --- */}
        <Link to="/" className="flex flex-col items-center shrink-0 z-[110]">
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-[#0F0F0F]">ARINYA</span>
          <span className="font-sans text-[7px] md:text-[9px] tracking-[0.5em] uppercase text-[#C19A6B] -mt-1">Shree</span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex gap-8">
          {navLinks.slice(0, 4).map((link) => (
            <Link key={link.name} to={link.path} className="font-sans text-[11px] uppercase tracking-widest text-[#0F0F0F] hover:text-[#C19A6B] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-3 md:gap-6 z-[110]">
          
          <div className="relative" ref={searchRef}>
            <button onClick={() => setShowSearch(!showSearch)} className="p-1">
              <Search className="w-5 h-5 text-[#0F0F0F]" />
            </button>
            {showSearch && (
              <div className="absolute right-0 top-full mt-4 w-[85vw] sm:w-80 bg-white border border-gray-100 shadow-2xl p-5 rounded-sm">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full font-serif italic border-b border-gray-100 pb-2 mb-4 outline-none focus:border-[#C19A6B]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredCategories.map((c, i) => (
                    <div key={i} onClick={() => navigate(`/categories?type=${c}`)} className="py-2 text-[10px] uppercase tracking-widest hover:text-[#C19A6B] cursor-pointer">{c}</div>
                  ))}
                  {filteredProducts.map((p) => (
                    <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <img src={p.image} className="w-8 h-10 object-cover" alt="" />
                      <span className="text-[11px] font-sans">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/wishlist" className="relative p-1">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "fill-[#8C1C13] text-[#8C1C13]" : "text-[#0F0F0F]"}`} />
          </Link>

          <button onClick={() => setIsOpen(true)} className="relative p-1">
            <ShoppingCart className="w-5 h-5 text-[#0F0F0F]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C19A6B] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </button>

          {/* Hamburger Icon */}
          <button className="lg:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-[#0F0F0F]" /> : <Menu className="w-6 h-6 text-[#0F0F0F]" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY (FIXED VERSION) --- */}
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-white transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-full invisible"
        }`}
        style={{ zIndex: 999 }} 
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10">
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="font-serif text-4xl italic text-[#0F0F0F] border-b border-gray-100 pb-4 flex justify-between items-center"
              >
                {item.name}
                <span className="text-xs font-sans not-italic text-[#C19A6B]">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <button 
              onClick={() => navigate("/shop")}
              className="w-full bg-[#C19A6B] text-[#0F0F0F] py-5 uppercase tracking-[0.3em] text-[12px] font-bold shadow-lg"
            >
              Start Shopping
            </button>
          </div>

          <div className="mt-auto pt-10 border-t border-gray-100">
             <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-400">Arinya Shree Boutique</p>
             <p className="font-serif italic text-[#0F0F0F] mt-2">Handcrafted Excellence Since 2004</p>
          </div>
        </div>
      </div>
    </nav>
  );
}