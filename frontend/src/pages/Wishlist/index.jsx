import { Navbar } from "../../components/Navbar";
import { WishlistProductCard } from "../../components/WishlistProductCard";
import { useWishlist } from "../../context/wishlist-context";

export const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8 mt-20">
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Your Wishlist
        </h1>
        
        <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
          {wishlist?.length > 0 ? (
            // SAFELY map over the wishlist, ignoring any null items
            wishlist.map((product) => (
              product && (
                <WishlistProductCard 
                  key={product._id || product.id} 
                  product={product} 
                />
              )
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-white p-12 rounded-lg shadow-sm border-2 border-gray-100 mt-8">
              <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                favorite_border
              </span>
              <p className="text-xl text-gray-500 font-medium">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};