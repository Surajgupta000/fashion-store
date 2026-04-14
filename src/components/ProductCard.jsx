import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react"; // Luxury-style icons
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  // Consuming contexts for functionality
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist: toggleContextWishlist } = useContext(WishlistContext);

  // Check if current product is in wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevents clicking the heart from opening the product page
    toggleContextWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents clicking the button from opening the product page
    addToCart(product);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer flex flex-col bg-white"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden bg-[#F9F9F9] aspect-[3/4] mb-5">
        
        {/* ❤️ WISHLIST ICON (Floating Luxury Style) */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-20 p-3 md:p-2.5 rounded-full bg-white/60 backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
        >
          <Heart 
            className={`w-5 h-5 md:w-4 md:h-4 transition-colors duration-300 ${
              isInWishlist ? "fill-arinya-red text-arinya-red" : "text-arinya-dark"
            }`} 
          />
        </button>

        {/* New Arrival Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 shadow-sm">
            <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold text-arinya-dark">
              New Arrival
            </span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
        />
        
        {/* Elegant Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
        
        {/* 🛒 ADD TO BAG (Modern Slide-up Action) */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-md py-4 px-4 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            className="w-full bg-arinya-gold text-black text-[10px] uppercase tracking-[0.3em] py-3 flex items-center justify-center gap-2 hover:brightness-95 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="text-center md:text-left space-y-1">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-arinya-gold font-medium">
          {product.category || "Handcrafted Luxury"}
        </p>

        <h3 className="font-serif text-lg text-arinya-dark group-hover:text-arinya-gold transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex justify-center md:justify-start items-baseline gap-3">
          <span className="font-sans text-sm font-light tracking-widest text-arinya-dark">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          
          {product.originalPrice && (
            <span className="font-sans text-[10px] text-gray-400 line-through tracking-tighter">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}