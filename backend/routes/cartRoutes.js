const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItemQuantity, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:productId').delete(protect, removeFromCart).put(protect, updateCartItemQuantity);
console.log("protect:", protect);
console.log("updateCartItemQuantity:", updateCartItemQuantity);

module.exports = router;