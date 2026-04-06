import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import exclusivedress from "../assets/lehenga4.jpg";

export default function Exclusive() {
  const { addToCart } = useContext(CartContext);

  const product = {
    id: 999,
    name: "Royal Silk Lehenga",
    price: 7999,
    originalPrice: 11999,
    image: exclusivedress
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

      {/* LEFT IMAGE */}
      <div className="flex-1">
        <img
          src={product.image}
          className="w-full rounded-2xl"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1">

        <h1 className="text-3xl font-bold mb-4">
          {product.name}
        </h1>

        {/* Pricing */}
        <div className="mb-4">
          <p className="text-gray-500 line-through">
            ₹{product.originalPrice}
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </p>

          <p className="text-sm text-red-500">
            {discount}% OFF
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 text-gray-600">
          A stunning handcrafted lehenga designed for elegance and grace.
          Perfect for weddings and festive occasions.
        </p>

        {/* Checkpoints */}
        <ul className="mb-6 space-y-2 text-sm">
          <li>✔ Premium quality fabrics</li>
          <li>✔ Handpicked design</li>
          <li>✔ Verified via WhatsApp concierge</li>
        </ul>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="btn-primary w-full"
        >
          Secure This Price 🔒
        </button>

      </div>

    </div>
  );
}