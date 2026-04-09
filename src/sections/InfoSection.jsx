import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Using the provided asset variable
import exclusiveDressImage from "../assets/lehenga4.jpg"; 

// Update these details for the specific product drop
const PRODUCT_INFO = {
  name: "The 'Amara' Banarasi Lehenga",
  regularPrice: "₹ 25,000",
  exclusivePrice: "₹ 18,000",
  discount: "20% OFF Launch Invitation",
  totalStock: 15, // Total made
  remainingStock: 3, // How many left (manually update or connect to backend)
};

const TIMER_DURATION = (6 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000) + (15 * 60 * 1000) + (30 * 1000);

const calculateTimeLeft = (target) => {
  const difference = target - Date.now();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      DD: Math.floor(difference / (1000 * 60 * 60 * 24)),
      HH: Math.floor((difference / (1000 * 60 * 60)) % 24),
      MM: Math.floor((difference / 1000 / 60) % 60),
      SS: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = { DD: 0, HH: 0, MM: 0, SS: 0 };
  }
  return { difference, timeLeft };
};

export default function ExclusiveDropSection() {
  const navigate = useNavigate();

  // Persist the target time across renders
  const [targetTime, setTargetTime] = useState(() => Date.now() + TIMER_DURATION);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime).timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const { difference, timeLeft: newTimeLeft } = calculateTimeLeft(targetTime);
      
      if (difference <= 0) {
        // Automatically restart from 6 days and so on when ended
        setTargetTime(Date.now() + TIMER_DURATION);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  // Helper to format numbers with leading zero
  const fmt = (num) => String(num).padStart(2, '0');

  return (
    // Background updated to a slightly warmer 'Bone' white for luxury feel
    <div className="w-full bg-[#FAF9F6] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* --- LEFT CONTENT: THE DROP DETAILS --- */}
        <div className="flex-1 space-y-8 order-2 md:order-1">
          
          {/* Label & Scarcity */}
          <div className="flex items-center gap-4">
            <span className="inline-block px-4 py-1 bg-arinya-gold text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium">
              Exclusive Drop
            </span>
            <span className="font-sans text-xs text-arinya-red font-medium animate-pulse-slow">
              Only {PRODUCT_INFO.remainingStock} of {PRODUCT_INFO.totalStock} Pieces Crafted
            </span>
          </div>

          {/* Headline - Using Hero Serif Font */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic leading-tight text-arinya-dark">
            {PRODUCT_INFO.name}
          </h2>

          {/* Pricing & Offer */}
          <div className="border-l-2 border-arinya-gold pl-6 py-2 space-y-2">
            <p className="font-sans text-arinya-gray line-through text-lg">
              {PRODUCT_INFO.regularPrice}
            </p>
            <div className="flex items-baseline gap-4">
              <p className="font-sans text-4xl font-semibold text-arinya-dark">
                {PRODUCT_INFO.exclusivePrice}
              </p>
              <span className="font-sans text-sm text-arinya-gold font-medium uppercase tracking-wider">
                ({PRODUCT_INFO.discount})
              </span>
            </div>
            <p className="font-sans text-sm text-arinya-gray pt-2 max-w-md">
              A masterwork of artisanal weaving. Secure your piece now at this complimentary launch value before general release.
            </p>
          </div>

          {/* --- THE ELEGANT TIMER --- */}
          <div className="py-6 border-y border-gray-200/70">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-arinya-gray mb-4 center md:text-left">
              Invitation Expires In:
            </p>
            <div className="flex justify-center md:justify-start gap-3 md:gap-5 text-arinya-dark font-sans">
              {[ 'DD', 'HH', 'MM', 'SS' ].map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-light tabular-nums">
                      {fmt(timeLeft[unit])}
                    </span>
                  </div>
                  <span className="text-[10px] mt-2 uppercase tracking-widest text-arinya-gray font-light">
                    {unit === 'DD' ? 'Days' : unit === 'HH' ? 'Hours' : unit === 'MM' ? 'Mins' : 'Secs'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- URGENCY CTA BUTTON --- */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => navigate("/exclusive")} // Navigate to exclusive page
              className="w-full sm:w-auto px-12 py-4 bg-arinya-dark !text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-arinya-gold hover:!text-white transition-colors duration-300 shadow-lg shadow-black/10"
            >
              Secure This Piece →
            </button>
            <p className="font-sans text-xs text-arinya-red font-medium text-center sm:text-left">
               *This edition will not be restocked.
            </p>
          </div>
        </div>


        {/* --- RIGHT IMAGE: LUXURY PRESENTATION --- */}
        <div className="flex-1 order-1 md:order-2 w-full flex justify-center lg:justify-end">
          {/* The "Asymmetric Frame" Magic */}
          <div className="relative p-4 md:p-6 bg-white border border-gray-100 shadow-2xl shadow-black/5 rounded-sm">
            
            {/* Accents (Small gold corner) */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-arinya-gold/40"></div>
            
            <img
              src={exclusiveDressImage}
              alt={PRODUCT_INFO.name}
              // Increased height slightly and used a softer shadow
              className="w-full h-[450px] lg:h-[550px] object-cover rounded-sm relative z-10"
            />
            
            {/* Image Caption/Badge */}
            <div className="absolute bottom-10 -left-8 z-20 bg-arinya-dark text-white px-6 py-3 shadow-xl transform -rotate-3">
                <p className="font-serif italic text-lg text-white">Edition 01</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}