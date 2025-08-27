import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recommendation from "./Recommendation";
import { IoLocationOutline } from "react-icons/io5";
import useAppStore from "../../store/useAppStore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { getProductById } = useAppStore();

  const getProductDetails = async (productId) => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  const handelAddToCart = () => {};

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product?.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name}
              className="w-full h-auto mb-4 rounded"
            />
          ))}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <span className="text-2xl font-bold mr-4">
                ₹ {product.finalPrice}
              </span>
              <span className="text-lg font-medium line-through mr-4">
                ₹ {product.price}
              </span>
            </div>
            {product.origin && (
              <div className="flex items-center mb-4">
                <IoLocationOutline className="inline-block text-gray-500 mr-1" />
                <span className="text-gray-500">
                  {product.origin || "Unknown Location"}
                </span>
              </div>
            )}
            <button
              onClick={handelAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Recommendation productId={id} />
    </div>
  );
};

export default ProductDetail;
