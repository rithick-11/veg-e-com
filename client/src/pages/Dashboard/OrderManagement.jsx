import React, { useEffect, useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaSave, FaTimes, FaReceipt } from 'react-icons/fa';

const OrderManagement = () => {
  const { orders, getAllOrders, updateOrder, deleteOrder, isLoading, error } = useAppStore();
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        toast.success('Order deleted successfully!');
      } catch (err) {
        toast.error(err.message || 'Failed to delete order');
      }
    }
  };

  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setNewStatus(order.status);
  };

  const handleSaveStatus = async () => {
    if (editingOrderId) {
      try {
        await updateOrder(editingOrderId, { status: newStatus });
        setEditingOrderId(null);
        setNewStatus('');
        toast.success('Order status updated successfully!');
      } catch (err) {
        toast.error(err.message || 'Failed to update order status');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setNewStatus('');
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading orders...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  const Tooltip = ({ text, children }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {text}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 whitespace-nowrap">
                  <Tooltip text={order._id}>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaReceipt className="mr-2 text-gray-400" size={16} />
                      {order._id.substring(0, 8)}...
                    </div>
                  </Tooltip>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                  <div>{order.user?.name || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-800">
                  ₹{order.totalAmount?.toFixed(2)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm">
                  {editingOrderId === order._id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    {editingOrderId === order._id ? (
                      <>
                        <Tooltip text="Save">
                          <button
                            onClick={handleSaveStatus}
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <FaSave size={18} />
                          </button>
                        </Tooltip>
                        <Tooltip text="Cancel">
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <FaTimes size={20} />
                          </button>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip text="Edit Status">
                          <button
                            onClick={() => handleEditClick(order)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <FaEdit size={18} />
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete Order">
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <FaTrash size={16} />
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
