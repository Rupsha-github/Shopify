import Order from "../models/Order.js"; // Import your existing Order model
import User from "../models/User.js";   // Import the User model to clear the cart

const generateAccessToken = async () => {
    const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_APP_SECRET).toString("base64");
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: { Authorization: `Basic ${auth}` },
    });
    const data = await response.json();
    return data.access_token;
};

export const createPayPalOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const accessToken = await generateAccessToken();

        const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: "USD", // Note: PayPal Sandbox doesn't support INR locally easily, use USD for testing
                        value: amount.toString(),
                    },
                }],
            }),
        });

        const order = await response.json();
        res.json(order);
    } catch (error) {
        console.error("PayPal Create Order Error:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

// @desc    Capture PayPal Order & Save to MongoDB
// @route   POST /api/payment/capture-paypal-order
export const capturePayPalOrder = async (req, res) => {
    try {
        const { orderID } = req.body;
        const accessToken = await generateAccessToken();

        // 1. Capture the payment with PayPal
        const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const captureData = await response.json();
        
        // 2. If PayPal payment is successful, create the Order in DB
        if (captureData.status === "COMPLETED") {
            
            // Get the user and their fully populated cart to freeze the prices/items
            const user = await User.findById(req.user._id).populate('cart.product');
            
            if (!user.cart || user.cart.length === 0) {
                return res.status(400).json({ message: "Cart is empty, cannot create order" });
            }

            // Map the cart items into the format your Order model expects
            const orderItems = user.cart.map(item => ({
                name: item.product.title,
                qty: item.quantity,
                image: item.product.images[0],
                price: item.product.price,
                product: item.product._id,
            }));

            // Calculate total price securely on the backend
            const totalPrice = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

            // Create the new order in MongoDB
            const order = new Order({
                user: req.user._id,
                orderItems,
                paymentMethod: "PayPal",
                paymentResult: {
                    id: captureData.id,
                    status: captureData.status,
                    update_time: captureData.update_time,
                    email_address: captureData.payer?.email_address || "N/A",
                },
                totalPrice,
                isPaid: true,
                paidAt: Date.now(),
            });

            const createdOrder = await order.save();

            // 3. Empty the user's cart now that they have paid
            user.cart = [];
            await user.save();

            // Send success response with the new order data
            res.json({ success: true, order: createdOrder });
        } else {
            res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("PayPal Capture Error:", error);
        res.status(500).json({ message: "Failed to capture payment and create order" });
    }
};