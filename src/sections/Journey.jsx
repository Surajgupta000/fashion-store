import { useNavigate } from "react-router-dom";
import loopVideo from "../assets/loop-video.mp4";

export default function Journey() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-black">
      
      {/* --- BACKGROUND VISUAL --- */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[20%]"
      >
        <source src={loopVideo} type="video/mp4" />
      </video>

      {/* --- VIGNETTE OVERLAY (Darkens edges for luxury feel) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
        
        <div className="flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/90 drop-shadow-md">
            The Tactile Experience
          </span>
          <div className="w-12 h-[1px] bg-arinya-gold"></div>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight drop-shadow-2xl">
          Feel the Fabric. <br />
          <span className="not-italic font-normal">Hand-selected for the <br /> 
          Modern Connoisseur.</span>
        </h2>

        <p className="font-sans text-white/70 text-xs md:text-sm uppercase tracking-[0.2em] max-w-lg mx-auto leading-loose italic">
          "Every thread in the Arinya Shree collection is chosen for its weight, weave, and whisper of elegance."
        </p>
        
        <div className="pt-6">
          {/* We point this to the GALLERY instead of the SHOP to vary the journey */}
          <button 
            onClick={() => navigate("/gallery")}
            className="group relative px-12 py-4 border border-white/30 text-white text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:border-white"
          >
            <span className="relative z-10 group-hover:text-arinya-dark transition-colors duration-500">
              Discover the Craft
            </span>
            {/* Slide-up white background on hover */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>

      {/* --- SCROLL INDICATOR (Subtle) --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
      </div>

    </section>
  );
}