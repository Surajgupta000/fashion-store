import { FaWhatsapp, FaShippingFast, FaRegGem, FaExchangeAlt, FaAward } from "react-icons/fa";

export default function RunningText() {
  const items = [
    { icon: <FaWhatsapp />, text: "Bespoke WhatsApp Ordering" },
    { icon: <FaRegGem />, text: "Artisanal Festive Edits" },
    { icon: <FaAward />, text: "Premium Heritage Quality" },
    { icon: <FaShippingFast />, text: "Global Insured Delivery" },
    { icon: <FaExchangeAlt />, text: "Seamless Exchanges" },
  ];

  return (
    <div className="relative bg-white mt-10 py-10 md:py-12 border-y border-arinya-gold/20 select-none">
      
      {/* Floating Brand Tag - Adjusted for Mobile Visibility */}
      <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 bg-white border border-arinya-gold px-4 py-1.5 md:px-6 md:py-2 shadow-xl whitespace-nowrap">
        <span className="font-serif italic text-arinya-dark tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs uppercase">
          Arinya Shree
        </span>
      </div>

      {/* Marquee Wrapper - Using the index.css animation */}
      <div className="overflow-hidden w-full flex">
        <div className="flex animate-marquee whitespace-nowrap items-center py-2">
          {/* We repeat the array twice for the seamless loop we set in CSS (-50%) */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center mx-6 md:mx-12 group">
                  <span className="text-arinya-gold text-base md:text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="ml-3 md:ml-4 font-sans text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-arinya-dark font-medium">
                    {item.text}
                  </span>
                  {/* Decorative Separator */}
                  <span className="ml-6 md:ml-12 text-arinya-gold/30 font-light select-none">
                    |
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}