import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/users" className="text-blue-600 hover:underline">
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="text-blue-600 hover:underline">
              Manage Orders
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="text-blue-600 hover:underline">
              Manage Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
