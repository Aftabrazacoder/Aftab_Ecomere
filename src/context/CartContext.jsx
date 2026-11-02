import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const loadCarts = () => {
  try {
    return JSON.parse(localStorage.getItem("carts")) ?? {};
  } catch {
    return {};
  }
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  // carts = { username: [ { id, name, price, image, qty } ] }
  const [carts, setCarts] = useState(loadCarts);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  const key = user?.username;
  const cart = key ? carts[key] || [] : [];

  const update = (fn) => key && setCarts((prev) => ({ ...prev, [key]: fn(prev[key] || []) }));

  const addToCart = (p) =>
    update((items) =>
      items.some((i) => i.id === p.id)
        ? items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }]
    );

  const setQty = (id, qty) =>
    update((items) =>
      qty < 1 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const removeItem = (id) => update((items) => items.filter((i) => i.id !== id));
  const clearCart = () => update(() => []);

  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ cart, count, total, addToCart, setQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
