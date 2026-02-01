import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";

export const ProductCard = ({ product }) => {
  const { cart, cartDispatch } = useCart();
  const navigate = useNavigate(); // 2. Initialize navigation

  // 3. check if product is in cart *before* rendering to determine button state
  const isProductInCart = findProductInCart(cart, product.id);

  const onAddToCartClick = (product) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { product },
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="w-72 h-[400px] m-4 flex flex-col relative shadow-lg rounded-lg bg-white overflow-hidden">
      {/* Image Container */}
      <div className="w-full h-80 rounded-t-lg overflow-hidden relative group">
        <img
          src={product.images[0]}
          srcSet={`${product.images[0]}?w=400 400w, ${product.images[0]}?w=800 800w`}
          sizes="(max-width: 768px) 400px, 800px"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            product.inStock
              ? "group-hover:scale-105"
              : "opacity-60 grayscale"
          }`}
          alt={product.title}
        />

        {/* Out of Stock Overlay Ribbon */}
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
          <p className="text-gray-600 pl-4 pb-2">Rs. {product.price}</p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex mt-auto">
          {/* Wishlist Button */}
          <button
            className="w-16 flex items-center justify-center bg-gray-100 text-gray-600 hover:text-red-500 hover:bg-gray-200 transition-colors rounded-bl-lg border-r border-gray-200"
            title="Add to Wishlist"
          >
            <span className="material-icons-outlined">favorite_border</span>
          </button>

          {/* Main Action Button */}
          <button
            // Logic: If out of stock, disabled. If in cart, navigate. If new, add to cart.
            onClick={() => 
              isProductInCart 
                ? navigate("/cart") 
                : onAddToCartClick(product)
            }
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 font-medium py-2 px-4 transition-colors rounded-br-lg ${
              !product.inStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Sold Out Style
                : isProductInCart
                ? "bg-amber-500 text-white hover:bg-amber-600"   // Go To Cart Style 
                : "bg-orange-500 text-white hover:bg-orange-600" // Add To Cart Style
            }`}
          >
            {/* Icon Logic */}
            <span className="material-icons-outlined">
              {!product.inStock ? "block" : isProductInCart ? "shopping_cart_checkout" : "shopping_cart"}
            </span>

            {/* Text Logic */}
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