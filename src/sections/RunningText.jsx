import { FaWhatsapp, FaShippingFast, FaTags, FaExchangeAlt, FaCrown } from "react-icons/fa";

export default function RunningText() {
  return (
    <div className="relative overflow-x-hidden overflow-y-visible whitespace-nowrap pt-10 pb-4 border border-[#C19A6B]/40">

      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[40%] bg-[#EADFD6] px-5 py-5 text-[#B58734] text-lg md:text-xl font-extrabold tracking-[0.2em] uppercase rounded shadow-sm">
        Arinya Shree
      </div>

      <div className="animate-marquee flex gap-10 overflow-hidden pt-4">
        {/* same content repeated twice */}
        <span className="flex items-center gap-2">
          <FaWhatsapp className="text-[#C19A6B]" />
          WhatsApp Ordering
        </span>

        <span className="flex items-center gap-2">
          <FaTags className="text-[#C19A6B]" />
          Festive Offers
        </span>

        <span className="flex items-center gap-2">
          <FaCrown className="text-[#C19A6B]" />
          Premium Quality
        </span>

        <span className="flex items-center gap-2">
          <FaShippingFast className="text-[#C19A6B]" />
          Fast Delivery
        </span>

        <span className="flex items-center gap-2">
          <FaTags className="text-[#C19A6B]" />
          Best Price
        </span>

        <span className="flex items-center gap-2">
          <FaExchangeAlt className="text-[#C19A6B]" />
          Easy Exchange
        </span>

        <span className="flex items-center gap-2">
          <FaCrown className="text-[#C19A6B]" />
          Huge Variety
        </span>

        <span className="flex items-center gap-2">
          <FaWhatsapp className="text-[#C19A6B]" />
          WhatsApp Ordering
        </span>

        <span className="flex items-center gap-2">
          <FaTags className="text-[#C19A6B]" />
          Festive Offers
        </span>

        <span className="flex items-center gap-2">
          <FaCrown className="text-[#C19A6B]" />
          Premium Quality
        </span>

        <span className="flex items-center gap-2">
          <FaShippingFast className="text-[#C19A6B]" />
          Fast Delivery
        </span>

        <span className="flex items-center gap-2">
          <FaTags className="text-[#C19A6B]" />
          Best Price
        </span>

        <span className="flex items-center gap-2">
          <FaExchangeAlt className="text-[#C19A6B]" />
          Easy Exchange
        </span>

        <span className="flex items-center gap-2">
          <FaCrown className="text-[#C19A6B]" />
          Huge Variety
        </span>
      </div>
    </div>
  );
}