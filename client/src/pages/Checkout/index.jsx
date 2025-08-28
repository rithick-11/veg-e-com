import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/useAppStore";
import { Container } from "../../components/UI";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, getCart, createOrder, isLoading } = useAppStore();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData = {
      shippingAddress,
      
      };

    try {
      const newOrder = await createOrder(orderData);
      navigate(`/order/${newOrder._id}`); // Redirect to the order confirmation page
    } catch (error) {
      // Error toast is handled in the store's createOrder action
      console.error("Failed to place order:", error);
    }
  };

  

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <ul>
                {cartItems?.map((item) => (
                  <li
                    key={item.product._id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>
                      ₹{(item.product.finalPrice * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <hr className="my-4" />
              
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
