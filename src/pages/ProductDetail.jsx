import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ProductGrid from "../components/ProductGrid";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  if (!product)
    return (
      <p className="text-center py-20">
        Product not found. <Link to="/products" className="text-saffron underline">Go back</Link>
      </p>
    );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!user) return navigate("/login", { state: { from: location.pathname } });
    addToCart(product);
  };

  return (
    <>
      <div className="bg-surface rounded-2xl p-6 grid md:grid-cols-2 gap-8">
        <div className="text-9xl text-center bg-surface2 rounded-xl py-16">{product.image}</div>
        <div>
          <p className="text-sm text-muted">{product.category}</p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          <p className="mt-4 text-muted">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-saffron">${product.price.toFixed(2)}</p>
          <button onClick={handleAdd} className="mt-6 bg-saffron text-ink rounded-lg px-6 py-2.5 hover:bg-saffron-dark">
            Add to cart
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-10 mb-4">Related products</h2>
          <ProductGrid products={related} />
        </>
      )}
    </>
  );
}
