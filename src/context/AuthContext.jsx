import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read("session", null));

  const startSession = (username) => {
    const session = { username };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);
  };

  const signup = ({ username, email, password }) => {
    const name = username.trim().toLowerCase();
    const mail = email.trim().toLowerCase();
    const users = read("users", []);

    if (users.some((u) => u.username === name))
      return { ok: false, error: "This username is already taken." };
    if (users.some((u) => u.email === mail))
      return { ok: false, error: "This email is already registered." };

    users.push({ username: name, email: mail, password });
    localStorage.setItem("users", JSON.stringify(users));
    startSession(name);
    return { ok: true };
  };

  const login = ({ username, password }) => {
    const name = username.trim().toLowerCase();
    const found = read("users", []).find(
      (u) => u.username === name && u.password === password
    );
    if (!found) return { ok: false, error: "Invalid username or password." };
    startSession(name);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
