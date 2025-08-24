import React from "react";
import { Container } from "./components/UI";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar, NewLetter } from "./components";
import { Home, Dashboard } from "./pages";

const App = () => {
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
          <NewLetter />
        </Container>{" "}
        <Footer />
      </div>
    </div>
  );
};

export default App;
