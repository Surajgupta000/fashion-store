import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exclusiveDressImage from "../assets/lehenga4.jpg"; 

const PRODUCT_INFO = {
  name: "The 'Amara' Banarasi Lehenga",
  regularPrice: "25,000",
  exclusivePrice: "18,000",
  discount: "20% OFF Launch Invitation",
  totalStock: 15,
  remainingStock: 3,
};

const TIMER_DURATION = (6 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000) + (15 * 60 * 1000) + (30 * 1000);

const calculateTimeLeft = (target) => {
  const difference = target - Date.now();
  let timeLeft = { DD: 0, HH: 0, MM: 0, SS: 0 };
  if (difference > 0) {
    timeLeft = {
      DD: Math.floor(difference / (1000 * 60 * 60 * 24)),
      HH: Math.floor((difference / (1000 * 60 * 60)) % 24),
      MM: Math.floor((difference / 1000 / 60) % 60),
      SS: Math.floor((difference / 1000) % 60),
    };
  }
  return { difference, timeLeft };
};

export default function ExclusiveDropSection() {
  const navigate = useNavigate();
  const [targetTime, setTargetTime] = useState(() => Date.now() + TIMER_DURATION);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime).timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const { difference, timeLeft: newTimeLeft } = calculateTimeLeft(targetTime);
      if (difference <= 0) {
        setTargetTime(Date.now() + TIMER_DURATION);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const fmt = (num) => String(num).padStart(2, '0');

  return (
    <div className="w-full bg-[#FAF9F6] px-4 sm:px-6 py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">

        {/* --- IMAGE: LUXURY PRESENTATION (Order 1 on Mobile) --- */}
        <div className="flex-1 order-1 md:order-2 w-full flex justify-center lg:justify-end">
          <div className="relative p-3 md:p-6 bg-white border border-gray-100 shadow-2xl rounded-sm max-w-[90%] md:max-w-full">
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-arinya-gold/40"></div>
            
            <img
              src={exclusiveDressImage}
              alt={PRODUCT_INFO.name}
              className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover rounded-sm relative z-10"
            />
            
            {/* Image Caption - Adjusted position for mobile to prevent overflow */}
            <div className="absolute bottom-6 -left-4 md:-left-8 z-20 bg-arinya-dark text-white px-4 py-2 md:px-6 md:py-3 shadow-xl transform -rotate-3">
                <p className="font-serif italic text-base md:text-lg text-white">Edition 01</p>
            </div>
          </div>
        </div>

        {/* --- CONTENT: THE DROP DETAILS (Order 2 on Mobile) --- */}
        <div className="flex-1 space-y-8 order-2 md:order-1 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="inline-block px-4 py-1 bg-arinya-gold text-[#0F0F0F] text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
              Exclusive Drop
            </span>
            <span className="font-sans text-[11px] md:text-xs text-arinya-red font-semibold animate-pulse-slow">
              Only {PRODUCT_INFO.remainingStock} of {PRODUCT_INFO.totalStock} Pieces Crafted
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl italic leading-tight text-arinya-dark px-2 md:px-0">
            {PRODUCT_INFO.name}
          </h2>

          <div className="border-l-0 md:border-l-2 border-arinya-gold md:pl-6 py-2 space-y-2">
            <p className="font-sans text-arinya-gray line-through text-base md:text-lg">
              ₹ {PRODUCT_INFO.regularPrice}
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
              <p className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold text-arinya-dark">
                ₹ {PRODUCT_INFO.exclusivePrice}
              </p>
              <span className="font-sans text-[10px] md:text-sm text-arinya-gold font-bold uppercase tracking-wider">
                ({PRODUCT_INFO.discount})
              </span>
            </div>
            <p className="font-sans text-xs md:text-sm text-arinya-gray pt-2 max-w-md mx-auto md:mx-0">
              A masterwork of artisanal weaving. Secure your piece now at this complimentary launch value.
            </p>
          </div>

          {/* --- THE ELEGANT TIMER --- */}
          <div className="py-6 border-y border-gray-200/70">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-arinya-gray mb-6">
              Invitation Expires In:
            </p>
            <div className="flex justify-center md:justify-start gap-2 sm:gap-4 text-arinya-dark">
              {[ 'DD', 'HH', 'MM', 'SS' ].map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-lg w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl md:text-4xl font-light tabular-nums">
                      {fmt(timeLeft[unit])}
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] mt-2 uppercase tracking-widest text-arinya-gray font-light">
                    {unit === 'DD' ? 'Days' : unit === 'HH' ? 'Hours' : unit === 'MM' ? 'Mins' : 'Secs'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- URGENCY CTA BUTTON --- */}
          <div className="pt-4 flex flex-col items-center md:items-start gap-6">
            <button
              onClick={() => navigate("/exclusive")}
              className="btn-accent w-full sm:w-auto px-12 py-4 text-[#0F0F0F] text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-xl transition-all active:scale-95"
            >
              Secure This Piece →
            </button>
            <p className="font-sans text-[10px] md:text-xs text-arinya-red font-semibold italic">
               *This edition will not be restocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}