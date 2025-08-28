const Product = require("../models/Product");
const Cart = require("../models/Cart");
const {
  getProdutByUserid,
  getRecommandedProductsList,
  dynamicProductList,
} = require("../utils/heler");

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding product", error: error.message });
  }
};

// @desc    Fetch all products (for public/user view)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    let products = await Product.find(); // Always fetch all products first

    if (req.user) {
      products = await dynamicProductList(products, req.user.id);
    }

    return res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// @desc    Fetch all products (for admin view)
// @route   GET /api/products/admin
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productObject = product.toObject();
    productObject.inCart = false;
    productObject.quantity = 0;

    // The route is protected, so req.user is available.
    if (req.user) {
      const cart = await Cart.findOne({ user: req.user._id });

      if (cart) {
        const cartItem = cart.items.find(
          (item) => item.product.toString() === product._id.toString()
        );

        if (cartItem) {
          productObject.inCart = true;
          productObject.quantity = cartItem.quantity;
        }
      }
    }

    res.json(productObject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.image = req.body.image || product.image; // Assuming image is a URL or path
      product.countInStock = req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const { pId } = req.params;
    const recmmendedProducts = await getRecommandedProductsList(
      req.user.id,
      pId
    );
    return res.json(recmmendedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recommended products",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getRecommendedProducts,
};
