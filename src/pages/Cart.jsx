import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { user } = useAuth();
  const { cart, total, setQty, removeItem, clearCart } = useCart();

  if (!cart.length)
    return (
      <div className="text-center py-20">
        <p className="text-5xl">🛒</p>
        <p className="mt-3 text-muted">@{user.username}, your cart is empty.</p>
        <Link to="/products" className="inline-block mt-4 bg-saffron text-ink rounded-lg px-5 py-2">Start shopping</Link>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">@{user.username}'s cart</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:underline">Clear cart</button>
      </div>

      <div className="bg-surface rounded-xl divide-y">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="text-4xl">{item.image}</div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(item.id, item.qty - 1)} className="w-8 h-8 border rounded-lg hover:bg-surface2">−</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => setQty(item.id, item.qty + 1)} className="w-8 h-8 border rounded-lg hover:bg-surface2">+</button>
            </div>
            <p className="w-20 text-right font-semibold">${(item.price * item.qty).toFixed(2)}</p>
            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300">✕</button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end items-center gap-6">
        <p className="text-xl">Total: <b className="text-saffron">${total.toFixed(2)}</b></p>
        <button className="bg-saffron text-ink rounded-lg px-6 py-2.5 hover:bg-saffron-dark">Checkout</button>
      </div>
    </>
  );
}
