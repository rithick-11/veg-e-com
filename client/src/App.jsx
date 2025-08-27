import React from "react";
import { Toaster } from "react-hot-toast";
import { Container } from "./components/UI";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar, NewLetter } from "./components";
import { Home, Dashboard, Login, Signup, Cart, Product } from "./pages";

const App = () => {
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
          </Routes>
          <NewLetter />
        </Container>{" "}
        <Footer />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App
