import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { ShieldCheck, Truck, MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/shop");
    }
  }, [cart, navigate]);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const handleOrder = () => {
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
    <div className="min-h-screen bg-[#FDFCFB] pt-28 md:pt-36 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Mobile Centered */}
        <header className="mb-12 md:mb-16 text-center lg:text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-arinya-gray hover:text-arinya-dark transition-colors mb-6 mx-auto lg:mx-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Return to Bag</span>
          </button>
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gold mb-2 block font-bold">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl md:text-5xl italic text-arinya-dark leading-tight">Finalizing Your Selection</h1>
          <div className="w-16 h-[1px] bg-arinya-gold mt-6 mx-auto lg:mx-0"></div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* --- LEFT: SHIPPING FORM --- */}
          <div className="flex-[1.5] space-y-12 order-2 lg:order-1">
            <div className="space-y-8 bg-white p-6 md:p-10 border border-gray-50 shadow-sm rounded-sm">
              <h2 className="font-serif text-2xl text-arinya-dark">Concierge Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-3">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray font-bold">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rohani Chauhan"
                    className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray font-bold">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray font-bold">Shipping Address</label>
                <textarea
                  placeholder="Complete address with landmark and pincode..."
                  rows="3"
                  className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-arinya-gold transition-colors font-sans text-sm resize-none"
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
            </div>

            {/* Arinya Guarantees - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-gray-100">
              <div className="flex flex-col items-center lg:items-start gap-3 text-arinya-dark text-center lg:text-left">
                <ShieldCheck className="w-6 h-6 text-arinya-gold" />
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold">Artisanal Quality Insured</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 text-arinya-dark text-center lg:text-left">
                <Truck className="w-6 h-6 text-arinya-gold" />
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold">Global White-Glove Shipping</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 text-arinya-dark text-center lg:text-left">
                <MessageCircle className="w-6 h-6 text-arinya-gold" />
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold">24/7 Personal Concierge</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: ORDER SUMMARY (Sticky on Desktop) --- */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="sticky top-32 bg-white border border-gray-100 p-6 md:p-8 shadow-2xl shadow-black/[0.03] rounded-sm">
              <h3 className="font-serif italic text-2xl mb-8 border-b border-gray-50 pb-4 text-arinya-dark">Selection Summary</h3>
              
              <div className="max-h-[35vh] overflow-y-auto custom-scrollbar pr-2 mb-8 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-20 bg-[#F9F9F9] flex-shrink-0 overflow-hidden rounded-sm">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-wider text-arinya-dark font-bold leading-tight">{item.name}</p>
                        <p className="font-sans text-[9px] text-arinya-gray mt-1 uppercase tracking-widest">Qty: {item.qty}</p>
                      </div>
                      <p className="font-sans text-xs font-semibold text-arinya-dark">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between font-sans text-[10px] uppercase tracking-[0.2em] text-arinya-gray">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-sans text-[10px] uppercase tracking-[0.2em] text-arinya-gold font-bold">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  <span className="font-serif italic text-2xl text-arinya-dark">Total</span>
                  <span className="font-sans font-bold text-2xl text-arinya-dark">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Order Button - Strictly btn-accent with black text */}
              <button
                onClick={handleOrder}
                className="btn-accent w-full mt-10 py-5 text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-[#0F0F0F]"
              >
                Request Order via WhatsApp
              </button>
              
              <p className="text-[8px] text-center mt-6 text-arinya-gray uppercase tracking-[0.3em] leading-relaxed opacity-70">
                *Prices are exclusive of international customs duties
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}