import { useState } from "react";
import exclusivedress from "../assets/lehenga4.jpg";

export default function ExclusiveProductPage() {
  // Product state - easy to update for different drops
  const product = {
    id: "AS-EXL-999",
    name: "The 'Amara' Banarasi Lehenga",
    price: "18,000",
    originalPrice: "25,000",
    image: exclusivedress,
    details: [
      "Pure Mulberry Silk with Zardosi Borders",
      "Hand-spun over 120 artisanal hours",
      "Signature 'Arinya' Gold Threadwork",
      "Includes Bespoke Sizing Consultation"
    ]
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "918777382510"; // Your Shop WhatsApp Number
    const message = `Hello Arinya Shree,\n\nI am interested in securing the Exclusive Price for the *${product.name}* (${product.id}).\n\nPlease let me know the availability and the process for bespoke measurements.\n\nThank you.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* TOP NAVIGATION / BREADCRUMB */}
        <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-6">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-arinya-gray">
            Private Collection / {product.id}
          </span>
          <span className="font-serif italic text-arinya-dark text-lg">Arinya Shree</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

          {/* LEFT: THE VISUAL MASTERPIECE */}
          <div className="flex-1 relative">
            <div className="sticky top-32">
              <div className="relative overflow-hidden group shadow-2xl">
                {/* Subtle Luxury Overlay on Image */}
                <div className="absolute inset-0 border-[15px] border-white/20 pointer-events-none z-10"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-white font-serif italic text-xl">Hand-crafted Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE CONCIERGE DESK */}
          <div className="flex-1 flex flex-col justify-center py-4">

            {/* Header Area */}
            <div className="mb-10">
              <div className="inline-block px-3 py-1 border border-arinya-red text-arinya-red text-[10px] uppercase tracking-widest mb-6">
                Single Edition Available
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-arinya-dark leading-[1.1] mb-4">
                {product.name}
              </h1>
              <p className="font-sans text-sm text-arinya-gray tracking-widest uppercase">
                A Legacy in Every Stitch
              </p>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm mb-10 relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className="absolute -right-4 -top-4 text-gray-50 text-7xl font-serif select-none">AS</div>

              <div className="relative z-10">
                <p className="font-sans text-arinya-gray line-through text-lg mb-1">
                  ₹{product.originalPrice}
                </p>
                <div className="flex items-center gap-6">
                  <h2 className="text-5xl font-sans font-light text-arinya-dark">₹{product.price}</h2>
                  <div className="h-10 w-[1px] bg-gray-200"></div>
                  <div>
                    <p className="text-arinya-red font-sans text-xs font-bold uppercase tracking-tighter">Exclusive Offer</p>
                    <p className="text-arinya-gray text-[10px] uppercase">Limited Time Benefit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Essence - Bullet Points */}
            <div className="space-y-6 mb-12">
              <h3 className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-arinya-dark">Attributes</h3>
              <ul className="grid grid-cols-1 gap-4">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-4 text-sm font-sans text-arinya-gray">
                    <span className="w-1.5 h-1.5 bg-arinya-gold rounded-full"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* THE MAGIC ACTION AREA */}
            <div className="space-y-6">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full group relative overflow-hidden bg-arinya-dark !text-white py-6 transition-all duration-500 hover:shadow-2xl active:scale-95"
              >
                {/* Visual "Shine" Effect on Button */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />

                <span className="relative z-10 font-sans text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                  Secure This Price via Concierge
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.694 2.547 2.621-.687c.912.571 1.835.91 3.032.911h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.767-5.767-5.767zm3.391 8.221c-.142.401-.707.726-.985.771-.245.051-.56.091-1.657-.341-1.402-.552-2.307-1.995-2.378-2.09-.071-.095-.578-.773-.578-1.485 0-.712.372-1.063.504-1.205.132-.142.284-.178.379-.178h.273c.09 0 .212-.034.331.253.123.296.42.1.018 1.027.42-.1.02.132-.07.284-.354.151-.552.237-.733.453-.181.216-.401.467-.145.912.256.445.547.732.88.933.32.2.6.262.83.178.209-.079.479-.319.546-.613.067-.294.067-.547.048-.613-.019-.066-.07-.107-.151-.151z" />
                  </svg>
                </span>
              </button>

              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-arinya-dark">Verified</span>
                </div>
                <div className="w-[1px] h-4 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-arinya-dark">Handcrafted</span>
                </div>
                <div className="w-[1px] h-4 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-arinya-dark">Bespoke</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}