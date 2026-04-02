import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useAuth } from "./auth-context";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await apiClient.get("/cart");
          setCart(data || []);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      })();
    } else {
      setCart([]);
    }
  }, [token]);

  const cartDispatch = async (action) => {
    if (!token) {
      toast.info("Please login to use the cart");
      return false;
    }

    try {
      let response;
      // Extract the correct ID safely
      const targetId = action.payload?.product?._id || action.payload?._id;

      if (!targetId) {
        console.error("Invalid Cart Payload: Missing _id", action.payload);
        toast.error("Error: Missing Database ID. Try refreshing.");
        return false;
      }

      switch (action.type) {
        case "ADD_TO_CART":
        case "INCREMENT_QUANTITY":
          response = await apiClient.post("/cart", { productId: targetId });
          setCart(response.data);
          break;
        case "REMOVE_FROM_CART":
          response = await apiClient.delete(`/cart/${targetId}`);
          setCart(response.data);
          break;
        case "DECREMENT_QUANTITY":
          toast.info("Decrement not fully supported yet.");
          break;
        default:
          return false;
      }
      return true;
    } catch (error) {
      console.error("Cart Action Failed", error);
      toast.error("Server error updating cart.");
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);