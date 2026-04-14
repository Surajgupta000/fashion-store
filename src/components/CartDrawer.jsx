import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    increaseQty, 
    decreaseQty, 
    removeItem 
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Safety checks for calculations
  const baseTotal = cart ? cart.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0) : 0;
  const totalQty = cart ? cart.reduce((acc, item) => acc + (item.qty || 1), 0) : 0;
  
  const itemsNeeded = Math.max(0, 5 - totalQty);
  const discount = itemsNeeded === 0 ? Math.round(baseTotal * 0.1) : 0;
  const finalTotal = baseTotal - discount;

  return (
    <>
      {/* --- OVERLAY BACKDROP --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- DRAWER CONTENT --- */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[150] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <button 
            onClick={() => setIsOpen(false)} 
            className="flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Back</span>
          </button>
          <h2 className="font-serif italic text-xl text-arinya-dark">Your Bag</h2>
          <div className="w-10"></div>
        </div>

        {/* Items List */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {!cart || cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="w-8 h-8 text-arinya-gold opacity-30" />
              <p className="font-serif italic text-lg text-arinya-gray">Your bag is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6 last:border-0">
                <div className="w-20 h-28 bg-[#F9F9F9] shrink-0 overflow-hidden rounded-sm">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <p className="font-sans text-[9px] uppercase tracking-widest text-arinya-gold">
                     {item.category}
                  </p>
                  <h3 className="font-sans text-xs uppercase font-bold tracking-tight text-arinya-dark leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm font-light">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                  
                  {/* Quantity Toggles */}
                  <div className="flex items-center gap-4 mt-4 bg-[#FDFCFB] w-max px-3 py-1 border border-gray-100">
                    <button 
                      onClick={() => decreaseQty(item.id)} 
                      className="text-lg hover:text-arinya-gold transition-colors px-1"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center tabular-nums">{item.qty}</span>
                    <button 
                      onClick={() => increaseQty(item.id)} 
                      className="text-lg hover:text-arinya-gold transition-colors px-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(item.id)} 
                  className="self-start p-2 text-gray-300 hover:text-arinya-red transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-[#FAF9F6] space-y-6 shrink-0">
          {totalQty > 0 && itemsNeeded > 0 && (
            <div className="bg-white/50 border border-arinya-gold/20 p-3 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-arinya-gold italic">
                Add {itemsNeeded} more for 10% Boutique Reward
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between font-sans text-[10px] uppercase tracking-widest text-arinya-gray">
              <span>Subtotal</span>
              <span className={discount > 0 ? "line-through opacity-40" : ""}>
                 ₹{baseTotal.toLocaleString('en-IN')}
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between font-sans text-[10px] uppercase tracking-widest text-green-700 font-bold">
                <span>Reward Applied</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-serif italic text-2xl text-arinya-dark">Total</span>
              <span className="font-bold text-2xl font-sans text-arinya-dark">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/checkout");
            }}
            className="btn-accent w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl transition-transform active:scale-95"
          >
            Finalize Selection
          </button>
          
          <p className="text-[8px] text-center text-arinya-gray uppercase tracking-widest opacity-60">
            Complimentary Shipping on all boutique orders
          </p>
        </div>
      </div>
    </>
  );
}