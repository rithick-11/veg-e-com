const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router
  .route("/:id")
  .get(protect, getOrderById) // User can get their own order, admin can get any
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

module.exports = router;
