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

const dynamicProductList = async (products, userId) => {
  const userCart = await Cart.findOne({ user: userId });
  if (userCart) {
    const cartProductMap = new Map();
    userCart.items.forEach((item) => {
      cartProductMap.set(item.product.toString(), item.quantity);
    });

    let productsList = products.map((product) => {
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

    return productsList;
  }

  return products;
};

const getRecommandedProductsList = async (userId, pId) => {
  const userCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );
  let pCatagory = new Set();
  let products = [];
  const { category } = await Product.findById(pId);
  pCatagory.add(category);
  if (userCart) {
    userCart.items.forEach((item) => {
      pCatagory.add(item.product.category);
    });
    products = await Product.find()
      .where("category")
      .in(Array.from(pCatagory))
      .exec();
  }

  return dynamicProductList(products, userId);
};

module.exports = { getProdutByUserid, getRecommandedProductsList, dynamicProductList };
