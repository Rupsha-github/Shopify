import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart-context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistProvider } from "./context/wishlist-context.jsx";
import { AuthProvider } from "./context/auth-context.jsx"; // Import AuthProvider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <ToastContainer position="bottom-right" autoClose={2000} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);
