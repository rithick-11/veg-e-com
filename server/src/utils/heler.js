const Product = require("../models/Product");
const Cart = require("../models/Cart");

const getProdutByUserid = async (userId) => {
  const userCart = await Cart.findOne({ user: userId });
  let products = await Product.find({});
  if (userCart) {
    const cartProductMap = new Map();
    userCart.items.forEach((item) => {
      cartProductMap.set(item.product.toString(), item.quantity);
    });

    products = products.map((product) => {
      const productIdString = product._id.toString();
      if (cartProductMap.has(productIdString)) {
        return {
          ...product.toObject(),
          isInCart: true,
          cartQuantity: cartProductMap.get(productIdString),
        };
      }
      return product.toObject();
    });
  }
  return products;
};

module.exports = { getProdutByUserid };

