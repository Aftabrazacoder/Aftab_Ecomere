import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto bg-surface rounded-2xl shadow-sm p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="username" value={form.username} onChange={onChange} placeholder="Username" required className="w-full border rounded-lg px-3 py-2" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" required className="w-full border rounded-lg px-3 py-2" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full bg-saffron text-ink rounded-lg py-2 hover:bg-saffron-dark">Login</button>
      </form>
      <p className="text-sm mt-4 text-center">
        New here? <Link to="/signup" className="text-saffron underline">Create an account</Link>
      </p>
    </div>
  );
}
