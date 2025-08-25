import React from "react";
import useAppStore from "../../store/useAppStore";
import { useEffect } from "react";
import ProductThumbnail from "../ProductThumbnail";

const NewArrivals = () => {
  const { fetchProducts, products } = useAppStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="title">New Arrivals</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {products?.map((product, i) => (
          <ProductThumbnail key={product._id || i} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default NewArrivals;
