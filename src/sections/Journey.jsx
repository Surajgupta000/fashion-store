import { useNavigate } from "react-router-dom";
import loopVideo from "../assets/loop-video.mp4";

export default function Journey() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center bg-black">
      
      {/* --- BACKGROUND VISUAL --- */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-50 md:opacity-60 grayscale-[20%]"
      >
        <source src={loopVideo} type="video/mp4" />
      </video>

      {/* --- VIGNETTE OVERLAY --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 md:from-black/40 md:to-black/60" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-6 md:space-y-8">
        
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <span className="font-sans text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/90 drop-shadow-md">
            The Tactile Experience
          </span>
          <div className="w-10 md:w-12 h-[1px] bg-arinya-gold"></div>
        </div>

        {/* Responsive Headline Scaling */}
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif italic text-white leading-tight drop-shadow-2xl">
          Feel the Fabric. <br className="hidden sm:block" />
          <span className="not-italic font-normal">Hand-selected for the <br className="hidden sm:block" /> 
          Modern Connoisseur.</span>
        </h2>

        <p className="font-sans text-white/80 text-[10px] md:text-sm uppercase tracking-[0.2em] max-w-xs md:max-w-lg mx-auto leading-relaxed md:leading-loose italic">
          "Every thread in the Arinya Shree collection is chosen for its weight, weave, and whisper of elegance."
        </p>
        
        <div className="pt-4 md:pt-6">
          {/* Button strictly updated to btn-accent with black text */}
          <button 
            onClick={() => navigate("/gallery")}
            className="btn-accent px-10 py-4 md:px-14 md:py-5 text-[#0F0F0F] text-[11px] md:text-xs uppercase tracking-[0.3em] font-bold shadow-2xl transition-all active:scale-95"
          >
            Discover the Craft
          </button>
        </div>
      </div>

      {/* --- SCROLL INDICATOR (Subtle) --- */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

    </section>
  );
}