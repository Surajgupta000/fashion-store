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
    <div className="relative bg-white mt-10 py-8 border-y border-arinya-gold/20">
      
      {/* Floating Brand Tag - no longer clipped! container overflow is visible */}
      <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 bg-white border border-arinya-gold px-6 py-2 shadow-xl whitespace-nowrap">
        <span className="font-serif italic text-arinya-dark tracking-[0.3em] text-[10px] md:text-xs uppercase">
          Arinya Shree
        </span>
      </div>

      {/* Wrapping ONLY the Marquee inside overflow-hidden to prevent horizontal page scrolling */}
      <div className="overflow-hidden w-full flex">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center mx-12 group">
                  <span className="text-arinya-gold text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="ml-4 font-sans text-[9px] md:text-xs uppercase tracking-[0.25em] text-arinya-dark">
                    {item.text}
                  </span>
                  <span className="ml-12 text-arinya-gold/30 font-light">|</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}