// File: src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-yellow-300 flex flex-col sm:flex-row sm:justify-between items-center">
      <h1 className="font-bold text-lg mb-2 sm:mb-0">LaughShare</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/post">Post a Joke</Link>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
