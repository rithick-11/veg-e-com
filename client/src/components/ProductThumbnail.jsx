import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

const ProductThumbnail = ({ product }) => {
  const finalPrice = product.finalPrice
    ? product.finalPrice
    : product.price * (1 - (product.discountPercentage || 0) / 100);

  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-xl font-bold text-green-600">
              ₹{Math.round(finalPrice)}
            </p>
            {product.discountPercentage > 0 && (
                 <p className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                 </p>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          <BsCartPlus className="text-lg" />
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProductThumbnail;