import React from "react";
import { Categories, HeroSection, NewArrivals } from "../../components";
import { cookieStorage } from "../../store/useAppStore";

const Home = () => {
  console.log("Token in Home:", cookieStorage.getItem("veg-token")); // Debugging line
  return (
    <main className="py-2">
      <HeroSection />
      <Categories />
      <NewArrivals />
    </main>
  );
};

export default Home;
