const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/').post(addProduct).get(getProducts);

module.exports = router;