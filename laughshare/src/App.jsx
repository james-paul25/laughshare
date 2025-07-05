import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import PostJoke from "./pages/PostJoke";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard"
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/useAuth";

function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      <img
        src="/laugh.png"
        alt="LaughShare Logo"
        className="w-24 h-24 animate-bounce"
      />
      <p className="mt-4 text-yellow-700 text-xl font-bold animate-pulse">
        LaughShare
      </p>
    </div>
  );
}

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return <SplashScreen />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostJoke />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const [splashLoading, setSplashLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>{splashLoading ? <SplashScreen /> : <AppRoutes />}</Router>
    </AuthProvider>
  );
}

export default App;
