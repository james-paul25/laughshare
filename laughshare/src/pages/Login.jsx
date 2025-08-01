import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Login to LaughShare</h2>
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded transition duration-200"
      >
        Login with Google
      </button>
    </div>
  );
}

// This component provides a simple login interface for users to authenticate using Google.
// It uses the `useAuth` hook to access the login function from the AuthContext.
// The button triggers the login process when clicked, allowing users to sign in to the application.
// The component is styled with Tailwind CSS for a clean and modern look.
