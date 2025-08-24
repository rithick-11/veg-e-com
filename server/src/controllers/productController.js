const Product = require('../models/Product');

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin (for now, public)
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
};