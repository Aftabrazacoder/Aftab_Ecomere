import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdd = () => {
    if (!user) return navigate("/login", { state: { from: location.pathname } });
    addToCart(product);
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <div className="text-6xl text-center bg-surface2 rounded-lg py-8">{product.image}</div>
        <h3 className="mt-3 font-semibold">{product.name}</h3>
      </Link>
      <p className="text-xs text-muted">{product.category}</p>
      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="font-bold text-saffron">${product.price.toFixed(2)}</span>
        <button onClick={handleAdd} className="bg-saffron text-ink text-sm rounded-lg px-3 py-1.5 hover:bg-saffron-dark">
          Add to cart
        </button>
      </div>
    </div>
  );
}
