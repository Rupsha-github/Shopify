import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();
router.route('/')
      .get(protect, getCart)
      .post(protect, addToCart);

router.route('/:id')
      .delete(protect, removeFromCart);

export default router;