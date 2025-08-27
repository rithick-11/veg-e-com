const express = require('express');
const { createProduct, getProducts, getProductById, getRecommendedProducts, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { protect, admin, optionalProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, createProduct).get(optionalProtect, getProducts);
router.route('/admin').get(protect, admin, getAllProducts); // New route for admin to get all products
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:pId/recommendations').get(protect, getRecommendedProducts);

module.exports = router;
