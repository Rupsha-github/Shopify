import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart-context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistProvider } from "./context/wishlist-context.jsx";
import { AuthProvider } from "./context/auth-context.jsx"; 
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PayPalScriptProvider
        options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}
      >
        <CartProvider>
          <WishlistProvider>
            <App />
            <ToastContainer position="bottom-right" autoClose={2000} />
          </WishlistProvider>
        </CartProvider>
      </PayPalScriptProvider>
    </AuthProvider>
  </BrowserRouter>
);