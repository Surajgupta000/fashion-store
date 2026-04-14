export default function About() {
  const stats = [
    { value: "100k+", label: "Patrons Served", color: "text-arinya-dark" },
    { value: "1000+", label: "Artisanal Designs", color: "text-arinya-gold" },
    { value: "20+", label: "Years of Legacy", color: "text-arinya-red" },
    { value: "Global", label: "Heritage Delivery", color: "text-slate-500" },
  ];

  return (
    <div className="py-16 md:py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* LEFT SIDE - STORY */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-arinya-gold font-medium">
              Our Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl italic leading-[1.2] lg:leading-[1.1] text-arinya-dark">
              Two Decades of <br className="hidden sm:block" />
              <span className="not-italic">Textile Mastery</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
            <p className="font-sans text-arinya-gray leading-relaxed text-sm md:text-base italic">
              "Arinya Shree is not just a boutique; it is a custodian of Indian craftsmanship."
            </p>
            <p className="font-sans text-arinya-gray leading-relaxed text-sm md:text-base">
              For over twenty years, we have traversed the heart of India’s textile hubs, from the silk looms of Kanchipuram to the zardosi workshops of Lucknow, to bring you pieces that define grace.
            </p>
            <p className="font-sans text-arinya-gray leading-relaxed text-sm md:text-base">
              Every garment in our atelier is hand-selected, ensuring that the thread, the weave, and the weight meet the Arinya standard of excellence.
            </p>
          </div>

          <div className="pt-4 flex justify-center lg:justify-start">
            <div className="w-20 h-[1px] bg-arinya-gold"></div>
          </div>
        </div>

        {/* RIGHT SIDE - NEUMORPHIC CARDS */}
        <div className="flex-1 flex justify-center w-full mt-8 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-10">
            {stats.map((card, index) => (
              <div
                key={index}
                className={`
                  w-[145px] h-[190px] sm:w-[170px] sm:h-[230px] md:w-[200px] md:h-[260px] 
                  rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-[#FAF9F6] 
                  shadow-[10px_10px_30px_#e5e4e1,-10px_-10px_30px_#ffffff]
                  md:shadow-[20px_20px_60px_#e5e4e1,-20px_-20px_60px_#ffffff] 
                  flex flex-col items-center justify-center p-4 md:p-6
                  transition-transform duration-500 hover:-translate-y-2 cursor-default
                `}
              >
                <p className={`text-2xl sm:text-3xl md:text-5xl font-serif italic ${card.color}`}>
                  {card.value}
                </p>
                <div className="w-6 md:w-8 h-[1px] bg-arinya-gold/30 my-3 md:my-4"></div>
                <p className="text-[9px] md:text-xs font-sans uppercase tracking-[0.2em] text-arinya-gray text-center leading-relaxed">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}