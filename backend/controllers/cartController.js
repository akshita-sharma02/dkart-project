const User = require('../models/userModel');

const getPopulatedCart = async (userId) => {
    const user = await User.findById(userId).populate({
        path: 'cart.product',
        model: 'Product'
    });
    return user.cart;
};

const getCart = async (req, res) => {
    try {
        const cart = await getPopulatedCart(req.user.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.findIndex(p => p.product.toString() === productId);
    if (itemIndex > -1) {
        user.cart[itemIndex].quantity += Number(quantity) || 1;
    } else {
        user.cart.push({ product: productId, quantity: Number(quantity) || 1 });
    }
    await user.save();
    const cart = await getPopulatedCart(req.user.id);
    res.status(201).json(cart);
};

const updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.findIndex(p => p.product.toString() === productId);
    if (itemIndex > -1) {
        if (quantity <= 0) {
            user.cart.splice(itemIndex, 1);
        } else {
            user.cart[itemIndex].quantity = Number(quantity);
        }
        await user.save();
        const cart = await getPopulatedCart(req.user.id);
        res.status(200).json(cart);
    } else {
        res.status(404).json({ message: "Item not found in cart" });
    }
};

const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(({ product }) => product.toString() !== productId);
    await user.save();
    const cart = await getPopulatedCart(req.user.id);
    res.status(200).json(cart);
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
};