const categories = [
  {
    name: "Sarees",
    image: "https://images.unsplash.com/photo-1610030469668-0a7b2b6c8d4f"
  },
  {
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
  },
  {
    name: "Suits",
    image: "https://images.unsplash.com/photo-1593032465171-8b1f3b36e3c7"
  },
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1520975922284-9e0c6b4f4d5f"
  },
  {
    name: "Dupattas",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990"
  },
  {
    name: "Fabrics",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03"
  }
];

export default function Categories() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Categories
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
          >
            
            <img
              src={cat.image}
              className="w-full h-60 object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-xl font-semibold">
                {cat.name}
              </h2>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}