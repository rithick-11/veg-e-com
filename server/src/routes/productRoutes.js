const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const { protect, admin, optionalProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, addProduct).get(optionalProtect, getProducts);

module.exports = router;