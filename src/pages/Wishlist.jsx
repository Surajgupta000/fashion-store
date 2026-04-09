import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ShoppingBag, X, ArrowLeft } from "lucide-react";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen bg-white">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Return</span>
          </button>
          <h1 className="font-serif text-4xl md:text-6xl italic text-arinya-dark">Your Curated <br /> <span className="not-italic">Selection</span></h1>
        </div>
        
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-arinya-gold font-medium">
          {wishlist.length} {wishlist.length === 1 ? 'Masterpiece' : 'Masterpieces'} Saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <p className="font-serif italic text-2xl text-arinya-gray">Your gallery is currently empty.</p>
          <button 
            onClick={() => navigate("/gallery")}
            className="px-10 py-4 bg-arinya-gold text-black text-[10px] uppercase tracking-[0.4em] hover:brightness-95 transition-all"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="grid gap-12">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col md:flex-row gap-8 md:gap-12 pb-12 border-b border-gray-50 last:border-0"
            >
              {/* IMAGE: Sharp and Sophisticated */}
              <div 
                className="relative h-[450px] w-full md:w-80 overflow-hidden cursor-pointer shrink-0 bg-[#F9F9F9]"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* CONTENT: High-end Typography */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-arinya-gold mb-2">
                        {item.category}
                      </p>
                      <h2 
                        className="text-3xl md:text-4xl font-serif text-arinya-dark cursor-pointer hover:italic transition-all"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h2>
                    </div>

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2 text-arinya-gray hover:text-arinya-red transition-colors group/remove"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-5 h-5 group-hover/remove:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>

                  <p className="font-sans text-arinya-gray text-sm tracking-wide leading-relaxed max-w-lg">
                    {item.description || "A testament to timeless elegance, meticulously crafted to define grace and individuality."}
                  </p>

                  <div className="space-y-1">
                    <p className="font-sans text-2xl text-arinya-dark font-light tracking-wider">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-arinya-gold">
                      Inclusive of all artisanal taxes
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 md:flex-none px-12 py-4 bg-arinya-gold text-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-95 transition-all shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Move to Bag
                  </button>
                  
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex-1 md:flex-none px-12 py-4 border border-gray-200 text-arinya-dark text-[10px] uppercase tracking-[0.4em] hover:bg-gray-50 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}