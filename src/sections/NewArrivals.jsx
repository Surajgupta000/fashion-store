import { useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function NewArrivals() {
  const navigate = useNavigate();

  // Filter for products marked 'isNew' and limit to 8 for a clean UI
  const latestArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 8); 

  return (
    <section className="pt-6 py-24 bg-white px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold font-semibold">
              Spring / Summer 2026
            </span>
            <h2 className="font-serif text-4xl md:text-6xl italic text-arinya-dark leading-tight">
              New <br /> <span className="not-italic font-normal">Arrivals</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-sans text-xs text-arinya-gray max-w-xs md:text-right uppercase tracking-widest leading-relaxed">
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

        {/* --- PRODUCT GRID (Limited to 8) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {latestArrivals.map((product) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* --- FOOTER CTA (Only shows if there are more than 8 products) --- */}
        {products.filter(p => p.isNew).length > 8 && (
          <div className="mt-20 text-center">
            <button 
              onClick={() => navigate("/shop")}
              className="px-12 py-4 bg-arinya-dark text-white text-[10px] uppercase tracking-[0.4em] hover:bg-arinya-gold transition-colors duration-500 shadow-xl"
            >
              Explore All New Drops
            </button>
          </div>
        )}

      </div>
    </section>
  );
}