import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import { ArrowLeft } from "lucide-react";

const CATEGORY_LIST = [
  { name: "Silk Saree", label: "Timeless Silk" },
  { name: "Fancy Saree", label: "Artisan Luxe" },
  { name: "Lehenga", label: "Bridal Heritage" },
  { name: "Gown", label: "Contemporary Grace" },
  { name: "Suit", label: "The Ethnic Edit" },
  { name: "Mens Wear", label: "Menswear Regal" }
];

export default function Categories() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load category products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = type
    ? products.filter((p) => p.category === type)
    : [];

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* --- CASE 1: CATEGORY DIRECTORY --- */}
        {!type && (
          <div className="space-y-12 md:space-y-16">
            <header className="text-center space-y-4 mb-12 md:mb-16">
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-arinya-gold font-bold">
                The Master Directory
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl italic text-arinya-dark leading-tight px-4">
                Bespoke Collections
              </h1>
              <div className="w-16 md:w-20 h-[1.5px] bg-arinya-gold mx-auto mt-6 md:mt-8"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {CATEGORY_LIST.map((cat, index) => {
                const thumb = products.find(p => p.category === cat.name)?.image;
                
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/categories?type=${cat.name}`)}
                    className="relative h-[300px] sm:h-[350px] md:h-[450px] group cursor-pointer overflow-hidden border border-gray-50 rounded-sm shadow-sm"
                  >
                    <img
                      src={thumb}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0"
                    />
                    {/* Responsive Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 md:bg-black/25 md:group-hover:bg-black/45 transition-all duration-700 flex flex-col items-center justify-center text-white p-6">
                      <p className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-2 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                        {cat.label}
                      </p>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl italic tracking-wide text-center">
                        {cat.name}
                      </h2>
                      <div className="mt-4 md:mt-6 overflow-hidden hidden sm:block">
                        <span className="inline-block border-b border-white pb-1 font-sans text-[9px] md:text-[10px] uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500">
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
          <div className="space-y-10 md:space-y-12">
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8 md:pb-10">
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/categories")}
                  className="group flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em]">All Categories</span>
                </button>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl italic text-arinya-dark capitalize leading-tight">
                  {type}
                </h1>
              </div>
              <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-arinya-gold font-bold">
                {filteredProducts.length} Exclusive Pieces found
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="w-full">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                <p className="font-serif italic text-xl md:text-2xl text-arinya-gray opacity-60">This collection is currently being curated.</p>
                <button 
                  onClick={() => navigate("/categories")}
                  className="mt-6 text-[10px] uppercase tracking-[0.3em] border-b border-arinya-gold pb-1 text-arinya-dark"
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