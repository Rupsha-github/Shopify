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
          setWishlist(data || []);
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
      // Extract the correct ID safely
      const targetId = action.payload?.product?._id || action.payload?._id;

      if (!targetId) {
        console.error("Invalid Wishlist Payload: Missing _id", action.payload);
        toast.error("Error: Missing Database ID. Try refreshing.");
        return false;
      }

      switch (action.type) {
        case "ADD_TO_WISHLIST":
          response = await apiClient.post("/wishlist", { productId: targetId });
          setWishlist(response.data);
          break;
        case "REMOVE_FROM_WISHLIST":
          response = await apiClient.delete(`/wishlist/${targetId}`);
          setWishlist(response.data);
          break;
        default:
          return false;
      }
      return true;
    } catch (error) {
      console.error("Wishlist Action Failed", error);
      toast.error("Server error updating wishlist.");
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