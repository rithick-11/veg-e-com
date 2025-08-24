import React, { useEffect } from "react";
import useAppStore from "../../store/useAppStore";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const {
    cartItems,
    getCart,
    addToCart,
    removeFromCart,
    isLoading,
    error,
  } = useAppStore();

  useEffect(() => {
    getCart();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      addToCart(productId, quantity);
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.finalPrice * item.quantity,
    0
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </ul>
          </div>
          <OrderSummary totalPrice={totalPrice} />
        </div>
      )}
    </div>
  );
};

export default Cart;
