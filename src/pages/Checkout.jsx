import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleOrder = () => {
    let message = `Order Details:\n\n`;

    cart.forEach((item) => {
      message += `${item.name} x${item.qty} - ₹${item.price * item.qty}\n`;
    });

    message += `\nTotal: ₹${total}\n\n`;
    message += `Name: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}`;

    const url = `https://wa.me/918651576301?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Items */}
      {cart.map((item) => (
        <div key={item.id} className="flex gap-3 mb-3">
          <img src={item.image} className="w-20 h-20 object-cover" />
          <div>
            <p>{item.name}</p>
            <p>{item.qty} x ₹{item.price}</p>
          </div>
        </div>
      ))}

      <p className="font-bold my-4">Total: ₹{total}</p>

      {/* Form */}
      <input
        placeholder="Your Name"
        className="border w-full p-2 mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Mobile Number"
        className="border w-full p-2 mb-2"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Shipping Address"
        className="border w-full p-2 mb-2"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button
        onClick={handleOrder}
        className="bg-green-500 text-white w-full py-2 rounded"
      >
        Order Now (WhatsApp)
      </button>

    </div>
  );
}