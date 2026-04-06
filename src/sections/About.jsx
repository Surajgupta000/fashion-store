export default function About() {
  return (
    <div className="py-20 px-6 bg-[#F9F9F9]">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE - TEXT */}
        <div className="flex-1">

          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            20+ Years of <br /> Textile Excellence
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Arinya Shree stands as a symbol of timeless elegance and trusted craftsmanship. 
            For over two decades, we have been curating premium sarees, lehengas, suits, 
            and fabrics sourced from skilled artisans and renowned textile hubs across India.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
            Every piece reflects our dedication to quality, detail, and authenticity — 
            designed to bring out confidence, grace, and individuality in every woman.
          </p>

        </div>

        {/* RIGHT SIDE - CARDS */}
        <div className="flex-1 flex justify-center">

          <div className="grid grid-cols-2 gap-6">

            {[
              {
                value: "100k+",
                label: "Satisfied customers",
                accent: "text-pink-500"
              },
              {
                value: "100+",
                label: "Unique designs",
                accent: "text-teal-500"
              },
              {
                value: "20+",
                label: "Years of trust",
                accent: "text-violet-500"
              },
              {
                value: "Pan India",
                label: "Delivery",
                accent: "text-orange-500"
              }
            ].map((card, index) => (
              <div
                key={index}
                className="w-[160px] h-[220px] md:w-[190px] md:h-[254px] rounded-[40px] bg-[#e0e0e0] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex flex-col items-center justify-center p-5"
              >
                <p className={`text-4xl md:text-5xl font-extrabold ${card.accent}`}>
                  {card.value}
                </p>
                <p className="mt-3 text-sm md:text-base text-gray-500 text-center">
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