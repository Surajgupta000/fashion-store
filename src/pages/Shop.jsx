import { useState, useMemo } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All", "Fancy Saree", "Lehenga", "Silk Saree", "Gown", "Crop Top", "Suit", "Mens Wear"
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("");

  // Filter and Sort logic combined
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // 1. Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Sort
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategory, sort]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-10">
      
      {/* --- HEADER & NAVIGATION --- */}
      <header className="text-center mb-16">
        <h1 className="font-serif text-5xl italic text-arinya-dark mb-4 tracking-tight">
          The Collections
        </h1>
        <div className="w-24 h-[1px] bg-arinya-gold mx-auto mb-10"></div>

        {/* Fancy Category Ribbon */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] pb-2 transition-all duration-300 relative ${
                activeCategory === cat 
                ? "text-arinya-dark font-bold" 
                : "text-gray-400 hover:text-arinya-dark"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-arinya-gold animate-in fade-in slide-in-from-left-2" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* --- SORTING TOOLBAR --- */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <p className="font-sans text-[10px] uppercase text-arinya-gray tracking-widest">
          Showing {filteredProducts.length} Exquisite Pieces
        </p>
        
        <div className="flex items-center gap-4">
          <span className="font-sans text-[10px] uppercase text-arinya-gray">Sort By:</span>
          <select 
            onChange={(e) => setSort(e.target.value)}
            className="font-sans text-[10px] uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            <option value="">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <p className="font-serif italic text-2xl text-arinya-gray">Coming Soon to the Atelier</p>
        </div>
      )}
    </div>
  );
}