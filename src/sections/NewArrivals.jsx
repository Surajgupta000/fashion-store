import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function NewArrivals() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);

  // Filter for products marked 'isNew' and limit to 8 for a clean UI
  const latestArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 8); 

  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold font-bold">
              Spring / Summer 2026
            </span>
            <h2 className="font-serif text-4xl md:text-6xl italic text-arinya-dark leading-tight">
              New <br className="hidden md:block" /> <span className="not-italic font-normal">Arrivals</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="font-sans text-[10px] md:text-xs text-arinya-gray max-w-xs text-center md:text-right uppercase tracking-[0.2em] md:tracking-widest leading-relaxed">
              Discover our latest artisanal creations, where heritage meets modern silhouette.
            </p>
            <button 
              onClick={() => navigate("/shop")}
              className="group flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-arinya-dark border-b border-arinya-dark pb-1 hover:text-arinya-gold hover:border-arinya-gold transition-all duration-300"
            >
              View Full Collection
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {/* Adjusted gap for mobile (gap-y-12) to keep the vertical flow elegant */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
          {latestArrivals.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* --- FOOTER CTA --- */}
        {products.filter(p => p.isNew).length > 8 && (
          <div className="mt-16 md:mt-20 text-center">
            {/* Strictly using btn-accent with black text */}
            <button 
              onClick={() => navigate("/shop")}
              className="btn-accent px-10 py-4 md:px-14 md:py-5 text-[#0F0F0F] text-[11px] md:text-xs uppercase tracking-[0.3em] font-bold shadow-xl transition-all active:scale-95"
            >
              Explore All New Drops
            </button>
          </div>
        )}

      </div>
    </section>
  );
}