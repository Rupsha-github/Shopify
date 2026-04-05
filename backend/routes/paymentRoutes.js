import express from 'express';
import { createPayPalOrder, capturePayPalOrder } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-paypal-order', protect, createPayPalOrder);
router.post('/capture-paypal-order', protect, capturePayPalOrder);

export default router;