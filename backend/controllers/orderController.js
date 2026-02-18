import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    // 1. Check Stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.title}. Available: ${product.quantity}`,
        });
      }
    }

    // 2. Create Order
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });
    const createdOrder = await order.save();

    // 3. Deduct Stock & Update Status
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      if (product.quantity <= 0) {
        product.quantity = 0;
        product.inStock = false;
      }
      await product.save();
    }

    // 4. Clear Cart
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
