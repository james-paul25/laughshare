import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      alert("Logged out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="p-4 bg-yellow-300 flex flex-col sm:flex-row sm:justify-between items-center">
      <h1 className="font-bold text-lg mb-2 sm:mb-0">LaughShare 😂</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-700">
          Home
        </Link>
        <Link to="/post" className="hover:text-blue-700">
          Post a Joke
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-red-600 hover:text-red-800 transition"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link to="/login" className="hover:text-blue-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
