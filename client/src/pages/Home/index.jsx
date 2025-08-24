import React from "react";
import { Categories, HeroSection, NewArrivals } from "../../components";

const Home = () => {
  return (
    <main className="py-2">
      <HeroSection />
      <Categories />
      <NewArrivals />
    </main>
  );
};

export default Home;
