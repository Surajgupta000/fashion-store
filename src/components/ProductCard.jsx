export default function ProductCard({ product }) {
  return (
    <div className="border p-3 rounded-lg group">
      
      <img src={product.image} className="w-full h-56 sm:h-60 md:h-64 object-cover" />

      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.brand}</p>
      <p className="font-bold">₹{product.price}</p>

      {/* Hover Button */}
      <button className="hidden group-hover:block mt-2 bg-black text-white px-4 py-1 rounded">
        Add to Cart
      </button>

    </div>
  );
}