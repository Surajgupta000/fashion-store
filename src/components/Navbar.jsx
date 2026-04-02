import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart, setIsOpen } = useContext(CartContext);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-xl font-bold">
          FASHION
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
        </div>

        {/* Cart */}
        <div
          className="relative cursor-pointer text-xl"
          onClick={() => {
            console.log("CART CLICKED"); // ✅ debug
            setIsOpen(true);
          }}
        >
          🛒

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}