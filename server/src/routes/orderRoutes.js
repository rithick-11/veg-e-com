const express = require("express");
const { createOrder, getOrders, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getAllOrders); // Modified getOrders to getAllOrders and added admin middleware
router.route("/:id").get(protect, admin, getOrderById).put(protect, admin, updateOrder).delete(protect, admin, deleteOrder);

module.exports = router;
