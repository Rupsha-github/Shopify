import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.route('/')
    .get(protect, getWishlist)
    .post(protect, addToWishlist);

router.route('/:id')
    .delete(protect, removeFromWishlist);

export default router;