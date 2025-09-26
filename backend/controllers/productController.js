const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: 'i',
      };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProducts };