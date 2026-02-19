import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart/index.jsx";
import { Wishlist } from "./pages/Wishlist/index.jsx";
import { Login } from "./pages/Login/index.jsx";
import { Signup } from "./pages/Signup/index.jsx";
import { useAuth } from "./context/auth-context.jsx";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
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
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
