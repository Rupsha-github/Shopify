import { useState, useEffect } from "react";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/cart-context";
import { PriceDetails } from "../../components/PriceDetails";

export const Cart = () => {
  const { cart } = useCart();
  const [filteredCart, setFilteredCart] = useState([]);

  // Sync filteredCart whenever the main cart changes (e.g., item removed)
  useEffect(() => {
    setFilteredCart(cart);
  }, [cart]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredCart(cart);
    } else {
      const filtered = cart.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredCart(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar searchData={cart} onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 md:px-8 my-24">
        <h1 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Your Cart Items
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 justify-center">
          {/* Left Column: Cart Items List */}
          <div className="flex flex-col gap-4 w-full lg:flex-1 md:ml-4">
            {filteredCart?.length > 0 ? (
              filteredCart.map((product) => (
                <HorizontalProductCard key={product.id} product={product} />
              ))
            ) : (
              <>
                {cart.length === 0 ? (
                  // Empty Cart State
                  <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] bg-gray-100 rounded-lg shadow-sm border-4 border-gray-300">
                    <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                      shopping_cart
                    </span>
                    <p className="text-xl text-gray-500">Your cart is empty.</p>
                  </div>
                ) : (
                  // Search Not Found State
                  <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] bg-gray-100 rounded-lg shadow-sm border-4 border-gray-300">
                    <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                      search_off
                    </span>
                    <p className="text-xl text-gray-500 text-center">
                      No products matched your search
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Price Details */}
          {/* Note: PriceDetails uses the Context directly, so it shows the total price of the *actual* cart, not just the filtered view. */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[30rem] shrink-0 md:ml-4">
              <PriceDetails />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
