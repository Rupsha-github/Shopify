import { toast } from "react-toastify";
import { useWishlist } from "../../context/wishlist-context";

export const WishlistProductCard = ({ product }) => {
  const { wishlistDispatch } = useWishlist();

  const onRemoveFromWishlistClick = (product) => {
    wishlistDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { id: product.id },
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
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
        />
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
            onClick={() => onRemoveFromWishlistClick(product)}
            className="w-full flex items-center justify-center gap-2 font-medium py-2 px-4 transition-colors rounded-b-lg bg-red-500 text-white hover:bg-red-600"
            title="Remove from Wishlist"
          >
            <span className="material-icons-outlined">delete</span>
            Remove From Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};
