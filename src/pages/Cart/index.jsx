import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/cart-context";
import { PriceDetails } from "../../components/PriceDetails";

export const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:px-8">
        <h1 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Your Cart Items
        </h1>

        {/* Responsive Layout: Column on mobile, Row on Large screens */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 justify-center items-start">
          
          {/* Left Column: Cart Items List */}
          {/* flex-1 ensures it fills the remaining space to maintain left/right symmetry */}
          <div className="flex flex-col gap-4 w-full lg:flex-1">
            {cart?.length > 0 ? (
              cart.map((product) => (
                <HorizontalProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm w-full">
                <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                  shopping_cart
                </span>
                <p className="text-xl text-gray-500">Your cart is empty.</p>
              </div>
            )}
          </div>

          {/* Right Column: Price Details */}
          {/* Increased width to lg:w-[30rem] for more space */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[30rem] lg:sticky lg:top-24 shrink-0 md:ml-4">
              <PriceDetails />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};