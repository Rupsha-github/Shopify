import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { useWishlist } from "../../context/wishlist-context";

export const ProductCard = ({ product }) => {
  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();
  const navigate = useNavigate();

  const isProductInCart = findProductInCart(cart, product.id);
  const isProductInWishlist = wishlist?.some((item) => item.id === product.id);

  const onAddToCartClick = (product) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { product },
    });
    toast.success("Product added to cart!");
  };

  const onAddToWishlistClick = (product) => {
    wishlistDispatch({
      type: "ADD_TO_WISHLIST",
      payload: { product },
    });
    toast.success("Product added to wishlist!");
  };

  const onRemoveFromWishlistClick = (id) => {
    wishlistDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { id },
    });
    toast.success("Product removed from wishlist!");
  };

  return (
    <div className="w-72 h-[400px] m-4 flex flex-col relative shadow-lg rounded-lg bg-white overflow-hidden">
      {/* Image */}
      <div className="w-full h-80 rounded-t-lg overflow-hidden relative group">
        <img
          src={product.images[0]}
          srcSet={`${product.images[0]}?w=400 400w, ${product.images[0]}?w=800 800w`}
          sizes="(max-width: 768px) 400px, 800px"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            product.inStock ? "group-hover:scale-105" : "opacity-60 grayscale"
          }`}
          alt={product.title}
        />

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <span className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded shadow-lg uppercase tracking-wider transform -rotate-6">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-grow mt-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800 truncate pl-4">
            {product.title}
          </h2>
          <p className="text-gray-600 pl-4 pb-2">&#x20B9; {product.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex mt-auto">
          {/* Wishlist Button */}
          <button
            onClick={() =>
              isProductInWishlist
                ? onRemoveFromWishlistClick(product.id)
                : onAddToWishlistClick(product)
            }
            className={`w-16 flex items-center justify-center transition-colors rounded-bl-lg border-r border-gray-200 ${
              isProductInWishlist
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-100 text-gray-600 hover:text-red-500 hover:bg-gray-200"
            }`}
            title={isProductInWishlist ? "Remove From Wishlist" : "Add to Wishlist"}
          >
            <span className="material-icons-outlined">
              favorite
            </span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() =>
              isProductInCart ? navigate("/cart") : onAddToCartClick(product)
            }
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 font-medium py-2 px-4 transition-colors rounded-br-lg ${
              !product.inStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isProductInCart
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            <span className="material-icons-outlined">
              {!product.inStock
                ? "block"
                : isProductInCart
                ? "shopping_cart_checkout"
                : "shopping_cart"}
            </span>
            {!product.inStock
              ? "Sold Out"
              : isProductInCart
              ? "Go To Cart"
              : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};