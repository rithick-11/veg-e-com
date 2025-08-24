import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAppStore((state) => ({
    token: state.token,
    user: state.user,
  }));
  const location = useLocation();

  if (!token) {
    // User is not logged in, redirect to login page.
    // Save the current location so we can redirect back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    // User is logged in but is not an admin, redirect to home page.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;