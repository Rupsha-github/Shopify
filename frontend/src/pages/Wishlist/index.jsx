import { useWishlist } from "../../context/wishlist-context";
import { Navbar } from "../../components/Navbar";
import { WishlistProductCard } from "../../components/WishlistProductCard";

export const Wishlist = () => {
  const { wishlist } = useWishlist();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:px-8">
        <h1 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Your WishList Items
        </h1>

        {/* Responsive Layout: Column on mobile, Row on Large screens */}
        <div className="flex flex-wrap lg:flex-row gap-4 md:gap-8 lg:gap-12 justify-center items-start">
          {/* Left Column: Cart Items List */}
          {/* flex-1 ensures it fills the remaining space to maintain left/right symmetry */}
          <div className="flex flex-wrap gap-4 w-full justify-evenly flex-1">
            {wishlist?.length > 0 ? (
              wishlist.map((product) => (
                <WishlistProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm w-full">
                <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                    favorite_border
                </span>
                <p className="text-xl text-gray-500">Your wishlist is empty.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
