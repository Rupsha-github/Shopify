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
      return;
    }

    try {
      let response;
      switch (action.type) {
        case "ADD_TO_WISHLIST":
          response = await apiClient.post("/wishlist", { productId: action.payload.product._id });
          setWishlist(response.data);
          break;
        case "REMOVE_FROM_WISHLIST":
          response = await apiClient.delete(`/wishlist/${action.payload.id}`);
          setWishlist(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Wishlist Action Failed", error);
      toast.error("Action failed");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);