import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const AdminRoute = (props) => {
  const { token, user, isUserLoading } = useAppStore()

  if (isUserLoading) {
    return <div className="text-center p-4">Loading authentication...</div>; // Or a more sophisticated spinner
  }

  if (!token) {
    // User is not logged in, redirect to login page.
    // Save the current location so we can redirect back after login.
    return <Navigate to="/login"replace />;
  }

  if (user?.role !== 'admin') {
    // User is logged in but is not an admin, redirect to home page.
    return <Navigate to="/" replace />;
  }

  return <Outlet {...props} />;
};

export default AdminRoute;
