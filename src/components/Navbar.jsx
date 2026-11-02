import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const link = ({ isActive }) =>
    isActive ? "text-saffron font-semibold" : "text-muted hover:text-saffron";

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide text-saffron font-[family-name:var(--font-display)]">✦ AftabAura</Link>

        <div className="flex items-center gap-5">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/products" className={link}>Products</NavLink>
          <NavLink to="/cart" className={link}>
            Cart
            {count > 0 && (
              <span className="ml-1 bg-saffron text-ink text-xs rounded-full px-2 py-0.5">{count}</span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, <b>@{user.username}</b></span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="text-sm border border-line rounded-lg px-3 py-1 hover:bg-surface2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm px-3 py-1 hover:text-saffron">Login</Link>
              <Link to="/signup" className="text-sm bg-saffron text-ink rounded-lg px-3 py-1 hover:bg-saffron-dark">Sign up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
