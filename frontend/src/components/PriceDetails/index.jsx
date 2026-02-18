import { useCart } from "../../context/cart-context";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";

export const PriceDetails = () => {
  const { cart } = useCart();

  if (!cart || cart.length === 0) {
    return null; // nothing to show if cart is empty
  }

  const totalPrice = getTotalCartAmount(cart);
  const deliveryCharges = 150;
  
  // Discount Logic
  let discountAmount = 0;
  if (totalPrice > 20000) {
    discountAmount = Math.round(totalPrice * 0.15); // 15% Discount
  }

  const totalAmount = totalPrice + deliveryCharges - discountAmount;

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full bg-white lg:w-[25rem] lg:ml-8">
      <p className="text-xl font-bold mb-4 border-b pb-2">Price Details</p>

      {/* Individual Item Breakup */}
      <div className="flex flex-col gap-4 mb-4 border-b pb-4">
        {cart.map((item) => {
          const quantity = item.quantity || 1;
          const itemTotal = item.price * quantity;

          return (
            <div key={item.id} className="flex flex-col text-sm">
              <div className="flex justify-between items-start">
                {/* Title and Quantity */}
                <p className="text-gray-700 font-medium w-2/3 leading-tight">
                  {item.title} <span className="text-gray-900 font-bold">(x{quantity})</span>
                </p>
                {/* Total Item Price */}
                <p className="text-gray-900 font-bold">
                  &#x20B9; {itemTotal}
                </p>
              </div>
              
              {/* Calculation Breakdown */}
              <p className="text-xs text-gray-500 mt-1 pl-1">
                 {item.price} * {quantity}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary Totals */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Price ({cart.length} items)</p>
          <p>&#x20B9; {totalPrice}</p>
        </div>
        
        {/* Conditional Discount Row */}
        {discountAmount > 0 && (
          <div className="flex gap-[114px] md:justify-between font-medium">
            <p>15% Discount for total above &#x20B9;20000</p>
            <p className="text-green-600 whitespace-nowrap">- &#x20B9; {discountAmount}</p>
          </div>
        )}

        <div className="flex justify-between">
          <p>Delivery Charges</p>
          <p className="text-green-600">&#x20B9; {deliveryCharges}</p>
        </div>

        <hr className="my-2 border-dashed" />

        <div className="flex justify-between font-bold text-lg text-gray-900">
          <p>Total Payable Amount</p>
          <p>&#x20B9; {totalAmount}</p>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors font-semibold shadow-md">
          Buy Now
        </button>
      </div>
    </div>
  );
};