const express = require('express');
const { addProduct, getProducts, getProductById, getRecommendedProducts } = require('../controllers/productController');
const { protect, admin, optionalProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, addProduct).get(optionalProtect, getProducts);
router.route('/:id').get(getProductById);
router.route('/:id/recommendations').get(protect, getRecommendedProducts);

module.exports = router;