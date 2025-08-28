const Order = require("../models/Order"); // Assuming this is the path to your Order model
const Cart = require("../models/Cart");

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return res.status(400).json({ message: "Shipping address is required" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all orders", error: error.message });
  }
};

/**
 * @desc    Update an order's status
 * @route   PUT /api/orders/:id
 * @access  Private/Admin
 */
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Using $set to update only the fields in the request body
      { new: true, runValidators: true } // `new: true` is crucial to return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      // Check if the user is an admin or the owner of the order
      if (
        req.user.role === "admin" ||
        order.user._id.toString() === req.user._id.toString()
      ) {
        res.json(order);
      } else {
        res.status(401).json({ message: "Not authorized to view this order" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

/**
 * @desc    Delete an order
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product"
    );
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user orders", error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
};
