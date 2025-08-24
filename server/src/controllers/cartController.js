const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Cart exists for user
      let itemIndex = cart.items.findIndex((p) => p.product == productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity = quantity;
        cart.items[itemIndex] = productItem;
      } else {
        // Product does not exists in cart, add new item
        cart.items.push({ product: productId, quantity });
      }
      cart = await cart.save();
      await cart.populate("items.product");
      return res.status(201).send(cart);
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
      await newCart.populate("items.product");
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    let itemIndex = cart.items.findIndex((p) => p.product == productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart = await cart.save();
    }

    await cart.populate("items.product");
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getCart, addToCart, removeFromCart };
