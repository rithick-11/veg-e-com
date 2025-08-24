const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, addProduct).get(getProducts);

module.exports = router;