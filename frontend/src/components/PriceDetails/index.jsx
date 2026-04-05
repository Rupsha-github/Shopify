import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import { PayPalButtons } from "@paypal/react-paypal-js";
import apiClient from "../../api/axios";
import { toast } from "react-toastify";

export const PriceDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // State to control when to show the PayPal buttons
  const [showPayPal, setShowPayPal] = useState(false);

  // --- FIXED CALCULATIONS ---
  // 1. Get the raw total of all items
  const totalPrice = getTotalCartAmount(cart);

  // 2. Calculate Discount (15% if total is above 20,000)
  const discountAmount = totalPrice > 20000 ? Math.round(totalPrice * 0.15) : 0;

  // 3. Delivery Charge (Free if nothing in cart, else 50)
  const deliveryCharges = totalPrice > 0 ? 50 : 0;

  // 4. Final Payable Amount
  const totalAmount = totalPrice - discountAmount + deliveryCharges;

  // 1. Create PayPal Order
  const createOrder = async (data, actions) => {
    try {
      const response = await apiClient.post("/payment/create-paypal-order", {
        amount: totalAmount, // Send the final discounted amount to PayPal
      });
      return response.data.id;
    } catch (error) {
      toast.error("Could not initiate checkout");
      console.error(error);
    }
  };

  // 2. Capture PayPal Order
  const onApprove = async (data, actions) => {
    try {
      const response = await apiClient.post("/payment/capture-paypal-order", {
        orderID: data.orderID,
      });

      if (response.data.success) {
        toast.success("Payment Successful! Order Placed.");

        // Force a page reload and send user home so the empty cart is fetched from the DB
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Payment failed to process");
      console.error(error);
    }
  };

  // If cart is empty, don't show the price details box at all
  if (!cart || cart.length === 0) return null;

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full bg-white lg:w-[25rem] lg:ml-8">
      <p className="text-xl font-bold mb-4 border-b pb-2">Price Details</p>

      {/* Individual Item Breakup */}
      <div className="flex flex-col gap-4 mb-4 border-b pb-4">
        {cart.map((item) => {
          const quantity = item.quantity || 1;
          const itemTotal = item.price * quantity;

          return (
            <div key={item._id || item.id} className="flex flex-col text-sm">
              <div className="flex justify-between items-start">
                {/* Title and Quantity */}
                <p className="text-gray-700 font-medium w-2/3 leading-tight">
                  {item.title}{" "}
                  <span className="text-gray-900 font-bold">(x{quantity})</span>
                </p>
                {/* Total Item Price */}
                <p className="text-gray-900 font-bold">&#x20B9; {itemTotal}</p>
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
            <p className="text-green-600 whitespace-nowrap">
              - &#x20B9; {discountAmount}
            </p>
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

      {/* CONDITIONAL RENDERING: Buy Now Button OR PayPal Buttons */}
      {!showPayPal ? (
        <button
          onClick={() => setShowPayPal(true)}
          className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md transition-colors shadow-sm text-lg"
        >
          Buy Now
        </button>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm text-gray-500 text-center mb-2 font-medium">
            Complete your secure payment
          </p>
          <div className="z-0 relative">
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => toast.error("PayPal Error! Please try again.")}
              style={{ layout: "vertical", shape: "rect", color: "gold" }}
            />
          </div>
          <button
            onClick={() => setShowPayPal(false)}
            className="text-sm text-gray-400 hover:text-gray-600 mt-2 underline text-center"
          >
            Cancel and go back
          </button>
        </div>
      )}
    </div>
  );
};
