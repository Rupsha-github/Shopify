import User from '../models/User.js';

// @desc    Get user wishlist
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        // Filter out nulls in case a product was deleted from DB
        const validWishlist = user.wishlist.filter(item => item !== null);
        res.json(validWishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Add item to wishlist
export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const user = await User.findById(req.user._id);
        
        // Safely check if product already in wishlist using .toString()
        const alreadyExists = user.wishlist.some(id => id.toString() === productId);
        
        if (!alreadyExists) {
            user.wishlist.push(productId);
            await user.save();
        }
        
        const updatedUser = await User.findById(req.user._id).populate('wishlist');
        const validWishlist = updatedUser.wishlist.filter(item => item !== null);
        
        res.json(validWishlist);
    } catch (error) {
        console.error("Add to wishlist error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Safely filter out the ID
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.id);
        await user.save();
        
        const updatedUser = await User.findById(req.user._id).populate('wishlist');
        const validWishlist = updatedUser.wishlist.filter(item => item !== null);
        
        res.json(validWishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};