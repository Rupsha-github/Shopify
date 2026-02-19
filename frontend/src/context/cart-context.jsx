import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useAuth } from "./auth-context";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  // Fetch Cart on Load
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await apiClient.get("/cart");
          setCart(data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      })();
    } else {
      setCart([]); // Clear cart on logout
    }
  }, [token]);

  // Cart Dispatcher for Components (Compatible interface)
  const cartDispatch = async (action) => {
    if (!token) {
      toast.info("Please login to use the cart");
      return;
    }

    try {
      let response;
      switch (action.type) {
        case "ADD_TO_CART":
          response = await apiClient.post("/cart", {
            productId: action.payload.product._id,
          });
          setCart(response.data);
          break;
        case "REMOVE_FROM_CART":
          response = await apiClient.delete(
            `/cart/${action.payload.product ? action.payload.product.id : action.payload.id}`,
          );
          setCart(response.data);
          break;
        case "INCREMENT_QUANTITY":
        case "DECREMENT_QUANTITY":
          // Using add to cart for increment (backend handles logic) or custom endpoints
          // For simplicity, re-adding increments. For decrement, we might need a specific endpoint or just ignore if simplified.
          // Assuming backend addToCart handles increment.
          if (action.type === "INCREMENT_QUANTITY") {
            response = await apiClient.post("/cart", {
              productId: action.payload.id,
            });
          } else {
            // For simplicity, we are deleting and re-adding, OR you can create a specific decrement endpoint on backend
            // Let's assume user manually removes.
            // Ideally: await apiClient.post(`/cart/decrement`, ...);
            // Current backend: addToCart increments. removeFromCart removes entirely.
            toast.info(
              "Quantity update not fully supported in this demo version",
            );
            return;
          }
          setCart(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Cart Action Failed", error);
      toast.error("Action failed");
    }
  };

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);