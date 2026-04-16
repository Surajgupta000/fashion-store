import { useState, useMemo } from "react";
import { useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All", "Fancy Saree", "Lehenga", "Silk Saree", "Gown", "Crop Top", "Suit", "Mens Wear"
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, sort]);

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20 px-4 md:px-10">
      
      {/* --- HEADER & CATEGORY NAVIGATION --- */}
      <header className="text-center mb-10 md:mb-16">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-arinya-dark mb-4 tracking-tight px-4">
          The Collections
        </h1>
        <div className="w-16 md:w-24 h-[1px] bg-arinya-gold mx-auto mb-8 md:mb-10"></div>

        {/* 📱 MOBILE: Horizontal Scroll | 💻 DESKTOP: Centered Wrap */}
        <nav className="relative">
          <div className="flex flex-nowrap md:flex-wrap lg:justify-center gap-x-6 md:gap-x-8 gap-y-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar px-4 scroll-smooth">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] pb-2 transition-all duration-300 relative whitespace-nowrap ${
                  activeCategory === cat 
                  ? "text-arinya-dark font-bold" 
                  : "text-gray-400 hover:text-arinya-dark"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-arinya-gold animate-in fade-in" />
                )}
              </button>
            ))}
          </div>
          {/* Subtle Fade-out mask for mobile scroll */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent md:hidden pointer-events-none"></div>
        </nav>
      </header>

      {/* --- TOOLBAR: Stats & Sorting --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-gray-100 pb-4 gap-4">
        <p className="font-sans text-[9px] md:text-[10px] uppercase text-arinya-gray tracking-widest text-center sm:text-left">
          Showing {filteredProducts.length} Exquisite Pieces
        </p>
        
        <div className="flex items-center gap-3">
          <span className="font-sans text-[9px] md:text-[10px] uppercase text-arinya-gray">Sort By:</span>
          <select 
            onChange={(e) => setSort(e.target.value)}
            className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer text-arinya-dark"
          >
            <option value="">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10">
          {filteredProducts.map((p) => (
            <div key={p.id} className="w-full">
               <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center px-6">
          <p className="font-serif italic text-xl md:text-2xl text-arinya-gray opacity-60">
            Current curation is being updated in the Atelier.
          </p>
          <button 
            onClick={() => setActiveCategory("All")}
            className="mt-6 text-[10px] uppercase tracking-widest border-b border-arinya-gold pb-1"
          >
            View All Collections
          </button>
        </div>
      )}
    </div>
  );
}