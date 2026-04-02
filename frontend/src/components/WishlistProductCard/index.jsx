import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import { toast } from "react-toastify";

export const WishlistProductCard = ({ product }) => {
  const { cart, cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();
  const navigate = useNavigate();

  // DEFENSIVE SHIELD: If the product is undefined, a string, or completely empty, render nothing.
  if (!product || typeof product === 'string') return null;

  const isInCart = cart?.some(
    (item) => item && (item._id === product._id || item.id === product.id)
  );

  const onRemoveClick = () => {
    wishlistDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { product },
    });
    toast.success("Removed from wishlist");
  };

  const onAddToCartClick = async () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      const success = await cartDispatch({
        type: "ADD_TO_CART",
        payload: { product },
      });
      
      if (success !== false) { 
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { product },
        });
        toast.success("Moved to cart");
      }
    }
  };

  return (
    <div className="w-64 border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow relative">
      {/* Remove from Wishlist Button */}
      <button 
        onClick={onRemoveClick}
        className="absolute top-2 right-2 z-10 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 hover:text-red-500 transition-all text-gray-500"
        title="Remove from Wishlist"
      >
        <span className="material-icons-outlined text-xl">delete</span>
      </button>

      {/* Product Image or Native Fallback */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
        {product?.images?.[0] ? (
          <img 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            src={product.images[0]} 
            alt={product.title || "Product"} 
          />
        ) : (
          // NATIVE FALLBACK: Uses your existing Material Icons instead of an external URL
          <div className="flex flex-col items-center text-gray-400">
            <span className="material-icons-outlined text-5xl mb-2">image_not_supported</span>
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1" title={product?.title}>
          {product?.title || "Unknown Product"}
        </h2>
        <p className="text-gray-600 text-sm mb-4 font-semibold">
          &#x20B9; {product?.price || 0}
        </p>
        
        {/* Actions */}
        <div className="mt-auto">
          <button
            onClick={onAddToCartClick}
            className={`w-full py-2.5 rounded font-medium transition-colors flex items-center justify-center gap-2 ${
              isInCart 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            <span className="material-icons-outlined text-lg">
              {isInCart ? "shopping_cart_checkout" : "add_shopping_cart"}
            </span>
            {isInCart ? "Go to Cart" : "Move to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};