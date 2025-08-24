import React from "react";

const OrderSummary = ({ totalPrice }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>
      <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
