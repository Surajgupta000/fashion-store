import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ShieldCheck, Truck, MessageCircle } from "lucide-react";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const handleOrder = () => {
    // Validation
    if (!form.name || !form.phone || !form.address) {
      alert("Please provide your details to finalize the couture order.");
      return;
    }

    let message = `*ARINYA SHREE - NEW ORDER REQUEST*\n`;
    message += `--------------------------\n\n`;

    cart.forEach((item) => {
      message += `• *${item.name}*\n  Qty: ${item.qty} | Price: ₹${(item.price * item.qty).toLocaleString('en-IN')}\n\n`;
    });

    message += `--------------------------\n`;
    message += `*Grand Total: ₹${total.toLocaleString('en-IN')}*\n\n`;
    message += `*SHIPPING DETAILS:*\n`;
    message += `Name: ${form.name}\n`;
    message += `Phone: ${form.phone}\n`;
    message += `Address: ${form.address}\n\n`;
    message += `_Please confirm availability and sharing payment details._`;

    const url = `https://wa.me/918777382510?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* --- LEFT: SHIPPING FORM --- */}
        <div className="flex-[1.5] space-y-10">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold mb-2 block">
              Secure Checkout
            </span>
            <h1 className="font-serif text-4xl italic text-arinya-dark">Finalizing Your Selection</h1>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rohani Chauhan"
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray">Shipping Address</label>
              <textarea
                placeholder="Complete address with pincode..."
                rows="3"
                className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm resize-none"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>

          {/* Arinya Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3 text-arinya-gray">
              <ShieldCheck className="w-5 h-5 opacity-60" />
              <span className="font-sans text-[10px] uppercase tracking-widest">Quality Insured</span>
            </div>
            <div className="flex items-center gap-3 text-arinya-gray">
              <Truck className="w-5 h-5 opacity-60" />
              <span className="font-sans text-[10px] uppercase tracking-widest">Priority Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-arinya-gray">
              <MessageCircle className="w-5 h-5 opacity-60" />
              <span className="font-sans text-[10px] uppercase tracking-widest">WhatsApp Concierge</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: ORDER SUMMARY (Sticky) --- */}
        <div className="flex-1">
          <div className="sticky top-32 bg-white border border-gray-100 p-8 shadow-2xl shadow-black/[0.02]">
            <h3 className="font-serif text-xl mb-8 border-b border-gray-50 pb-4">Order Summary</h3>
            
            <div className="max-h-[40vh] overflow-y-auto custom-scrollbar pr-2 mb-8 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-arinya-dark font-medium">{item.name}</p>
                      <p className="font-sans text-[10px] text-arinya-gray mt-1">Qty: {item.qty}</p>
                    </div>
                    <p className="font-sans text-sm font-light">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex justify-between font-sans text-xs uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-sans text-xs uppercase tracking-widest text-arinya-gold">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between font-sans text-lg pt-4 border-t border-gray-50">
                <span className="font-serif italic">Total</span>
                <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="w-full mt-10 bg-arinya-gold text-black py-5 font-sans text-xs uppercase tracking-[0.3em] hover:brightness-95 transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
            >
              Request Order via WhatsApp
            </button>
            <p className="text-[9px] text-center mt-4 text-arinya-gray uppercase tracking-widest opacity-60">
              *A concierge will contact you for payment confirmation
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}