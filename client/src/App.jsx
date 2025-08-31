import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Container } from "./components/UI";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar, NewLetter, ScrollToTop } from "./components";
import AdminRoute from "./components/AdminRoute";
import {
  Home,
  Dashboard,
  Login,
  Signup,
  Cart,
  Product,
  Checkout,
  Profile,
} from "./pages";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserManagement from "./pages/Dashboard/UserManagement";
import OrderManagement from "./pages/Dashboard/OrderManagement"; // New import
import ProductManagement from "./pages/Dashboard/ProductManagement";
import useAppStore from "./store/useAppStore";
import NotFound from "./pages/NotFound";

const App = () => {
  const { loadUser } = useAppStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <Container>
          <ScrollToTop />
          <Routes>
            {/* <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>

            {/* Admin Routes */}

            {/* <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/dashboard/users" element={<UserManagement />} />
              <Route path="/dashboard/orders" element={<OrderManagement />} />
              <Route path="/dashboard/products" element={<ProductManagement />} />
            </Route> 
             */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <NewLetter />
        </Container>{" "}
        <Footer />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
