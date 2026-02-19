import User from "../models/User.js";

// @desc    Get user wishlist
// @route   GET /api/wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist.product");
    const wishlistItems = user.wishlist.map(item => item.product);
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user.id);

    // Check if product already in wishlist
    const isProductInWishlist = user.wishlist.some(item => item.product.toString() === productId);

    if (!isProductInWishlist) {
      user.wishlist.push({ product: productId });
      await user.save();
    }

    const updatedUser = await User.findById(req.user.id).populate("wishlist.product");
    const wishlistItems = updatedUser.wishlist.map(item => item.product);
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== req.params.id,
    );
    await user.save();

    const updatedUser = await User.findById(req.user.id).populate("wishlist.product");
    const wishlistItems = updatedUser.wishlist.map(item => item.product);
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};