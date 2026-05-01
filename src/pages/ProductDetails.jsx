import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { fetchProducts } from "../services/api";
import { Heart, ShoppingBag, ShieldCheck, Truck, ArrowLeft, Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsOpen } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const allProducts = await fetchProducts();
        const foundProduct = allProducts.find((p) => String(p.id) === String(id));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Failed to load product details", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <p className="font-serif italic text-2xl text-arinya-gray">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <p className="font-serif italic text-2xl text-arinya-gray">Piece not found in the Atelier.</p>
        <button onClick={() => navigate("/shop")} className="btn-accent px-8 py-3 uppercase tracking-widest text-[10px]">Return to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity });
    setIsOpen(true); // Open the side cart automatically
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Return</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* --- LEFT: PRODUCT IMAGE GALLERY --- */}
          <div className="flex-1 space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] rounded-sm shadow-sm group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
              />
              {/* Luxury Badge */}
              {product.isNew && (
                <div className="absolute top-6 left-6 bg-arinya-dark text-white px-4 py-1 text-[9px] uppercase tracking-[0.3em] font-bold">
                  New Arrival
                </div>
              )}
            </div>
            
            {/* Grid for secondary images (if you add them to your data later) */}
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-[3/4] bg-gray-50 opacity-50 border border-dashed border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">Atelier View</div>
               <div className="aspect-[3/4] bg-gray-50 opacity-50 border border-dashed border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">Fabric Detail</div>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT DETAILS (Sticky on Desktop) --- */}
          <div className="flex-1 lg:sticky lg:top-32 lg:h-fit space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold font-bold">
                   {product.category}
                 </span>
                 <div className="flex gap-1 text-arinya-gold ml-auto">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                 </div>
              </div>
              
              <h1 className="font-serif text-3xl md:text-5xl italic text-arinya-dark leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 pt-2">
                <p className="font-sans text-2xl md:text-3xl font-light text-arinya-dark">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] uppercase tracking-widest text-arinya-gray">Inclusive of all taxes</span>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-arinya-gray leading-relaxed max-w-xl italic">
              {product.description || "A masterpiece of heritage weaving, this piece represents the pinnacle of Arinya Shree craftsmanship. Designed for the modern individual who cherishes timeless grace."}
            </p>

            {/* Selection Controls */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                <div className="space-y-3">
                  <span className="block font-sans text-[10px] uppercase tracking-widest text-arinya-gray font-bold">Quantity</span>
                  <div className="flex items-center gap-6 border border-gray-200 w-max px-4 py-2 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-lg hover:text-arinya-gold transition-colors">-</button>
                    <span className="font-sans text-sm font-bold w-4 text-center tabular-nums">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-lg hover:text-arinya-gold transition-colors">+</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block font-sans text-[10px] uppercase tracking-widest text-arinya-gray font-bold text-right">Availability</span>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full">Ready to Ship</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn-accent flex-[2] py-5 text-[#0F0F0F] text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Couture Bag
                </button>
                
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 py-5 border flex items-center justify-center gap-3 transition-all duration-500 rounded-full
                    ${isWishlisted ? "bg-arinya-red/5 border-arinya-red text-arinya-red" : "border-gray-200 text-arinya-dark hover:border-arinya-dark"}`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                    {isWishlisted ? "Saved" : "Wishlist"}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-100">
               <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-arinya-gold shrink-0" />
                  <div className="space-y-1">
                    <p className="font-sans text-[9px] uppercase tracking-widest font-bold text-arinya-dark">Quality Assured</p>
                    <p className="text-[8px] text-arinya-gray leading-tight uppercase tracking-tighter">Every thread hand-inspected by masters.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-arinya-gold shrink-0" />
                  <div className="space-y-1">
                    <p className="font-sans text-[9px] uppercase tracking-widest font-bold text-arinya-dark">White-Glove Delivery</p>
                    <p className="text-[8px] text-arinya-gray leading-tight uppercase tracking-tighter">Global insured shipping in luxury boxes.</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}