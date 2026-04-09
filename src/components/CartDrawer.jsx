import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, X, ChevronLeft } from "lucide-react";

export default function CartDrawer() {
  // Ensure these names match your CartContext exactly
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    increaseQty, 
    decreaseQty, 
    removeItem 
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Standardize values to prevent "NaN" errors
  const baseTotal = cart ? cart.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0) : 0;
  const totalQty = cart ? cart.reduce((acc, item) => acc + (item.qty || 1), 0) : 0;
  
  // Discount Logic
  const itemsNeeded = Math.max(0, 5 - totalQty);
  const discount = itemsNeeded === 0 ? Math.round(baseTotal * 0.1) : 0;
  const finalTotal = baseTotal - discount;

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[150] transform transition-transform duration-500 ease-in-out flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between bg-white shrink-0">
        <button 
          onClick={() => setIsOpen(false)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-[10px] uppercase tracking-widest">Close</span>
        </button>
        <h2 className="font-serif italic text-xl">Your Selection</h2>
        <div className="w-10"></div>
      </div>

      {/* Items List */}
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {!cart || cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40">
            <p className="font-serif italic text-lg text-arinya-gray">Your bag is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
              <div className="w-20 h-28 bg-gray-100 shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              
              <div className="flex-1 space-y-1">
                <p className="font-sans text-[9px] uppercase tracking-widest text-arinya-gold">
                   {item.category || "Luxury Edition"}
                </p>
                <h3 className="font-sans text-xs uppercase font-bold tracking-tight text-arinya-dark">
                  {item.name}
                </h3>
                <p className="font-sans text-sm font-light">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
                
                <div className="flex items-center gap-4 mt-4 bg-gray-50 w-max px-3 py-1 border border-gray-100">
                  <button onClick={() => decreaseQty(item.id)} className="text-lg hover:text-arinya-gold transition-colors">-</button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)} className="text-lg hover:text-arinya-gold transition-colors">+</button>
                </div>
              </div>

              <button 
                onClick={() => removeItem(item.id)} 
                className="self-start p-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-8 border-t bg-gray-50 space-y-6 shrink-0">
        {totalQty > 0 && itemsNeeded > 0 && (
          <p className="text-[10px] uppercase tracking-widest text-arinya-gold text-center italic">
            Add {itemsNeeded} more for 10% Boutique Discount
          </p>
        )}

        <div className="space-y-2">
          <div className="flex justify-between font-sans text-xs uppercase tracking-widest">
            <span>Subtotal</span>
            <span className={discount > 0 ? "line-through opacity-40" : ""}>
               ₹{baseTotal.toLocaleString('en-IN')}
            </span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between font-sans text-xs uppercase tracking-widest text-green-700">
              <span>Boutique Reward (10%)</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-200">
            <span className="font-serif italic text-xl">Total</span>
            <span className="font-bold text-xl font-sans">
              ₹{finalTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/checkout");
          }}
          className="w-full bg-arinya-dark text-white py-4 font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-arinya-gold transition-all shadow-xl"
        >
          Checkout Selection
        </button>
      </div>
    </div>
  );
}