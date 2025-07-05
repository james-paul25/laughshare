import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
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
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-yellow-300 shadow sticky top-0 z-50 transition-all">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="block md:inline hover:text-blue-700 mb-2 md:mb-0 transition duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <h1 className="text-gray-800 font-bold text-xl md:text-2xl">
            LaughShare
          </h1>
        </Link>

        <button
          className="md:hidden text-gray-800 transition hover:scale-110"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div
          className={`${
            menuOpen ? "block animate-slide-down" : "hidden"
          } md:flex md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-yellow-300 md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all ease-in-out duration-300`}
        >
          <Link
            to="/"
            className="block md:inline hover:text-blue-700 mb-2 md:mb-0 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/post"
            className="block md:inline hover:text-blue-700 mb-2 md:mb-0 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Post a Joke
          </Link>

          {user ? (
            <div className="relative inline-block" ref={dropdownRef}>
              <img
                src={user.photoURL}
                alt="Profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full border border-gray-500 cursor-pointer transition-transform duration-200 hover:scale-110"
                title={user.displayName}
              />

              {dropdownOpen && (
                <div
                  className="absolute mt-2 bg-white border rounded-md shadow-md w-48 z-50 animate-fade-in-scale 
                  left-0 md:right-0 md:left-auto"
                >
                  <div className="p-3 border-b text-gray-800 font-medium">
                    {user.displayName}
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/leaderboard"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    View Leaderboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="block md:inline hover:text-blue-700 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
