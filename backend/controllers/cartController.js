import User from "../models/User.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    // Filter out any null products (deleted items)
    const validCart = user.cart.filter((item) => item.product !== null);
    const cartItems = validCart.map((item) => ({
      ...item.product._doc,
      quantity: item.quantity,
    }));
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const itemExists = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (itemExists) {
      itemExists.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product",
    );
    const cartItems = updatedUser.cart
      .filter((item) => item.product !== null)
      .map((item) => ({ ...item.product._doc, quantity: item.quantity }));

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.id,
    );
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product",
    );
    const cartItems = updatedUser.cart
      .filter((item) => item.product !== null)
      .map((item) => ({ ...item.product._doc, quantity: item.quantity }));

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
