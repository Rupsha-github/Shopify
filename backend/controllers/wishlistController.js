import User from '../models/User.js';

export const getWishlist = async (req, res) => {
    try {
        // .populate() grabs the full product details based on the 'ref' in User.js
        const user = await User.findById(req.user._id).populate('wishlist');
        
        // Safety filter: Ensures we only send valid products to the frontend 
        // (This completely eliminates the "Unknown Product" UI issue)
        const validWishlist = user.wishlist.filter(item => item && item.title);
        
        res.json(validWishlist);
    } catch (error) {
        console.error("GET Wishlist Error:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    try {
        const user = await User.findById(req.user._id);
        
        // Prevent duplicates
        const alreadyExists = user.wishlist.some(id => id.toString() === productId);
        if (!alreadyExists) {
            user.wishlist.push(productId);
            await user.save();
        }
        
        const updatedUser = await User.findById(req.user._id).populate('wishlist');
        const validWishlist = updatedUser.wishlist.filter(item => item && item.title);
        
        res.json(validWishlist);
    } catch (error) {
        console.error("Add to wishlist error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.id);
        await user.save();
        
        const updatedUser = await User.findById(req.user._id).populate('wishlist');
        const validWishlist = updatedUser.wishlist.filter(item => item && item.title);
        
        res.json(validWishlist);
    } catch (error) {
        console.error("Remove from wishlist error:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};