import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9_]{3,15}$/.test(form.username))
      return setError("Username: 3–15 letters, numbers or underscore.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const res = signup(form);
    if (!res.ok) return setError(res.error);
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto bg-surface rounded-2xl shadow-sm p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="username" value={form.username} onChange={onChange} placeholder="Unique username" required className="w-full border rounded-lg px-3 py-2" />
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" required className="w-full border rounded-lg px-3 py-2" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" required className="w-full border rounded-lg px-3 py-2" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full bg-saffron text-ink rounded-lg py-2 hover:bg-saffron-dark">Sign up</button>
      </form>
      <p className="text-sm mt-4 text-center">
        Already have an account? <Link to="/login" className="text-saffron underline">Login</Link>
      </p>
    </div>
  );
}
