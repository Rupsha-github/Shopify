import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart/index.jsx";
import { Wishlist } from "./pages/Wishlist/index.jsx";
import { Login } from "./pages/Login/index.jsx";
import { Signup } from "./pages/Signup/index.jsx";
import { useAuth } from "./context/auth-context.jsx";
import { Navbar } from "./components/Navbar/index.jsx"; // Imported to keep the layout consistent

// Protected Route Component
const ProtectedRoute = ({ children, fallbackMessage }) => {
  const { token } = useAuth();

  // If the user is not logged in, show the message instead of the component
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow gap-6 pb-20">
          <span className="material-icons-outlined text-6xl text-gray-300">
            lock
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center px-4">
            {fallbackMessage}
          </h1>
          <Link 
            to="/login" 
            className="bg-orange-500 text-white font-medium py-2 px-8 rounded hover:bg-orange-600 transition-colors shadow-md"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  // If the user is logged in, show the requested page (Cart or Wishlist)
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute fallbackMessage="Please login to view your cart">
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute fallbackMessage="Please login to view your wishlist">
            <Wishlist />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;