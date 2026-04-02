import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { useAuth } from "./auth-context";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await apiClient.get("/wishlist");
          setWishlist(data);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      })();
    } else {
      setWishlist([]);
    }
  }, [token]);

  const wishlistDispatch = async (action) => {
    if (!token) {
      toast.info("Please login to use wishlist");
      return false;
    }

    try {
      let response;
      
      // Safely extract the MongoDB _id
      const targetId = action.payload.product?._id || action.payload._id;

      switch (action.type) {
        case "ADD_TO_WISHLIST":
          if (!targetId) {
            console.error("Cannot add: Missing MongoDB _id on product", action.payload);
            toast.error("Database ID error. Try refreshing the page.");
            return false;
          }
          response = await apiClient.post("/wishlist", { productId: targetId });
          setWishlist(response.data);
          break;

        case "REMOVE_FROM_WISHLIST":
          if (!targetId) {
             console.error("Cannot remove: Missing MongoDB _id", action.payload);
             return false;
          }
          response = await apiClient.delete(`/wishlist/${targetId}`);
          setWishlist(response.data);
          break;

        default:
          return false;
      }
      return true;
    } catch (error) {
      console.error("Wishlist Action Failed:", error.response?.data || error.message);
      toast.error("Action failed on server");
      return false;
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);