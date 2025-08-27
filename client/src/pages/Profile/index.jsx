import React, { useEffect, useState } from "react";
import { Container } from "../../components/UI";
import useAppStore from "../../store/useAppStore";
import server from "../../services/api";
import {
  FaUserCircle,
  FaShoppingBag,
  FaCalendarAlt,
  FaHashtag,
  FaDollarSign,
  FaShippingFast,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAppStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await server.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <div className="py-12 min-h-[calc(100vh-400px)]">
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaShoppingBag className="mr-3" /> Order History
              </h2>
              {isLoading ? (
                <p>Loading your orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">You have no orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FaHashtag className="mr-2" />
                            Order ID: {order._id}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <FaCalendarAlt className="mr-2" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold flex items-center">
                            <FaDollarSign className="mr-1" />
                            {order.totalAmount.toFixed(2)}
                          </p>
                          <p
                            className={`text-sm font-medium mt-1 px-2 py-1 rounded-full inline-block ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <FaShippingFast className="inline mr-1.5" />
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li
                              key={item.product._id}
                              className="flex justify-between items-center text-sm"
                            >
                              <span>
                                {item.product.title} &times; {item.quantity}
                              </span>
                              <span className="text-gray-600">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
