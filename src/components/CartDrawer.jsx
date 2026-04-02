import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    setIsOpen,
    increaseQty,
    decreaseQty,
    removeItem
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md sm:max-w-sm md:max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between">
        <h2 className="font-bold text-lg">Your Selection</h2>
        <button onClick={() => setIsOpen(false)}>❌</button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex gap-3 border p-2 rounded">

              <img
                src={item.image}
                className="w-16 h-16 object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p>₹{item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <button onClick={() => removeItem(item.id)}>❌</button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <p className="font-bold mb-2">Total: ₹{total}</p>

        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/checkout");
          }}
          className="w-full bg-black text-white py-2 rounded"
        >
          Finalize Order
        </button>
      </div>
    </div>
  );
}