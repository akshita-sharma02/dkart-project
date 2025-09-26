const User = require('../models/userModel');
const getCart = async (req, res) => {
    const user = await User.findById(req.user.id).populate('cart.product');
    res.json(user.cart);
};
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.findIndex(p => p.product == productId);
    if (itemIndex > -1) {
        user.cart[itemIndex].quantity += quantity;
    } else {
        user.cart.push({ product: productId, quantity });
    }
    await user.save();
    const populatedUser = await User.findById(req.user.id).populate('cart.product');
    res.status(201).json(populatedUser.cart);
};
const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(({ product }) => product.toString() !== productId);
    await user.save();
    const populatedUser = await User.findById(req.user.id).populate('cart.product');
    res.json(populatedUser.cart);
};
const updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
        // If the new quantity is 0 or less, remove the item
        if (quantity <= 0) {
            user.cart.splice(itemIndex, 1);
        } else {
            // Otherwise, update the quantity
            user.cart[itemIndex].quantity = quantity;
        }

        await user.save();
        const populatedUser = await User.findById(req.user.id).populate('cart.product');
        res.json(populatedUser.cart);
    } else {
        res.status(404).json({ message: "Item not found in cart" });
    }
};
module.exports = { getCart, addToCart, removeFromCart, updateCartItemQuantity };