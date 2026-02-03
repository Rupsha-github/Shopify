import { toast } from "react-toastify";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import { findProductInWishlist } from "../../utils/findProductInWishlist";
import { useNavigate } from "react-router-dom";

export const HorizontalProductCard = ({ product }) => {
  const { cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();
  const navigate = useNavigate();

  const isInWishlist = findProductInWishlist(wishlist, product.id);

  const onRemoveFromCartClick = () => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: product.id },
    });
    toast.success("Product removed from cart");
  };

  const handleIncrement = () => {
    cartDispatch({
      type: "INCREMENT_QUANTITY",
      payload: { id: product.id },
    });
  };

  const handleDecrement = () => {
    cartDispatch({
      type: "DECREMENT_QUANTITY",
      payload: { id: product.id },
    });
  };

  const onWishlistClick = () => {
    if (isInWishlist) {
      // If already in wishlist, navigate to wishlist page
      navigate("/wishlist");
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { product },
      });
      toast.success("Product moved to wishlist");
    }
  };

  return (
    <div className="flex flex-row shadow-lg rounded-lg overflow-hidden bg-white my-2 lg:w-[80%] lg:h-[14rem] lg:mx-16 md:mx-4 h-[14rem] border border-gray-100 w-full">
      {/* Image Section */}
      <div className="relative w-[9rem] md:w-[12rem] h-full flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={product.images[0]}
          alt={product.title}
        />
        <small className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded">
          Trending
        </small>
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between p-3 md:p-4 flex-grow">
        <div>
          <h2 className="text-base md:text-lg font-bold text-gray-800 line-clamp-1">
            {product.title}
          </h2>
          <p className="text-gray-800 font-semibold text-sm md:text-base">
            &#x20B9; {product.price}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mt-2 md:mt-3">
          <p className="text-xs md:text-sm font-medium text-gray-700">Qty:</p>
          <div className="flex items-center gap-2 border rounded px-1 py-0.5 md:px-2 md:py-1">
            <button
              onClick={handleDecrement}
              disabled={product.quantity <= 1}
              className={`px-2 py-0.5 md:py-1 text-gray-700 rounded transition-colors ${
                product.quantity <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              -
            </button>
            <span className="px-1 md:px-2 font-medium text-sm">
              {product.quantity || 1}
            </span>
            <button
              onClick={handleIncrement}
              className="px-2 py-0.5 md:py-1 text-gray-700 hover:bg-gray-200 rounded transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-3 md:mt-4">
          <button
            onClick={onRemoveFromCartClick}
            className="flex-1 flex items-center justify-center gap-1 md:gap-2 bg-orange-500 text-white text-xs md:text-sm font-medium py-1.5 px-2 md:py-2 md:px-4 rounded hover:bg-orange-600 transition-colors"
          >
            <span className="material-icons-outlined text-sm md:text-base">
              remove_shopping_cart
            </span>
            Remove From Cart
          </button>

          <button
            onClick={onWishlistClick}
            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 border text-xs md:text-sm font-medium py-1.5 px-2 md:py-2 md:px-4 rounded transition-colors ${
              isInWishlist
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "border-orange-500 text-orange-500 hover:bg-orange-50"
            }`}
          >
            <span className="material-icons-outlined text-xs md:text-base">
              {isInWishlist ? "arrow_right_alt" : "favorite"}
            </span>
            {isInWishlist ? "Go To Wishlist" : "Move to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};
