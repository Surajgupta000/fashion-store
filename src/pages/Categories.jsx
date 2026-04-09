import { useLocation, useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { ArrowLeft } from "lucide-react";

// Categorized assets logic - keeping it dynamic
const CATEGORY_LIST = [
  { name: "Silk Saree", label: "Timeless Silk" },
  { name: "Lehenga", label: "Bridal Heritage" },
  { name: "Gown", label: "Contemporary Grace" },
  { name: "Suit", label: "The Ethnic Edit" },
  { name: "Mens Wear", label: "Menswear Regal" }
];

export default function Categories() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type");

  // Filter products based on category type
  const filteredProducts = type
    ? products.filter((p) => p.category === type)
    : [];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* --- CASE 1: CATEGORY DIRECTORY --- */}
        {!type && (
          <div className="space-y-16">
            <header className="text-center space-y-4 mb-16">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold">
                The Master Directory
              </span>
              <h1 className="font-serif text-5xl md:text-7xl italic text-arinya-dark">
                Bespoke Collections
              </h1>
              <div className="w-20 h-[1px] bg-arinya-dark mx-auto mt-8"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {CATEGORY_LIST.map((cat, index) => {
                // Find first product in this category to show as the thumbnail
                const thumb = products.find(p => p.category === cat.name)?.image;
                
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/categories?type=${cat.name}`)}
                    className="relative h-[400px] group cursor-pointer overflow-hidden border border-gray-100"
                  >
                    <img
                      src={thumb}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    />
                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex flex-col items-center justify-center text-white">
                      <p className="font-sans text-[10px] uppercase tracking-[0.4em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {cat.label}
                      </p>
                      <h2 className="font-serif text-3xl md:text-5xl italic tracking-wide">
                        {cat.name}
                      </h2>
                      <div className="mt-6 overflow-hidden">
                        <span className="inline-block border-b border-white pb-1 font-sans text-[10px] uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          View Selection
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- CASE 2: FILTERED PRODUCT VIEW --- */}
        {type && (
          <div className="space-y-12">
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/categories")}
                  className="group flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em]">All Categories</span>
                </button>
                <h1 className="font-serif text-4xl md:text-6xl italic text-arinya-dark capitalize">
                  {type}
                </h1>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-arinya-gold font-medium">
                {filteredProducts.length} Exclusive Pieces found
              </p>
            </div>

            {/* Product Grid - Reusing the Global ProductCard for consistency */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <p className="font-serif italic text-2xl text-arinya-gray">This collection is currently being curated.</p>
                <button 
                  onClick={() => navigate("/categories")}
                  className="mt-6 text-[10px] uppercase tracking-[0.3em] border-b border-arinya-dark"
                >
                  Return to Directory
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}