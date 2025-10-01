import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Recommendation from "./Recommendation";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useAppStore from "../../store/useAppStore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [isCartActionLoading, setIsCartActionLoading] = useState(false);
  const { getProductById, user, addToCart, updateCartQuantity } = useAppStore();

  const getProductDetails = async (productId) => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
      if (data && data.inCart) {
        setQuantityToAdd(data.quantity);
      } else {
        setQuantityToAdd(1);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantityToAdd(value);
    } else if (e.target.value === "") {
      setQuantityToAdd(""); // Allow empty input temporarily for user typing
    }
  };

  const handleIncrement = () => {
    setQuantityToAdd((prev) => (prev === "" ? 1 : prev + 1));
  };

  const handleDecrement = () => {
    setQuantityToAdd((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCartAction = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (quantityToAdd === "" || quantityToAdd <= 0) {
      toast.error("Quantity must be a positive number.");
      return;
    }

    setIsCartActionLoading(true);
    const wasInCart = product.inCart;

    try {
      if (wasInCart) {
        await updateCartQuantity(product._id, quantityToAdd);
        toast.success("Cart updated successfully");
      } else {
        await addToCart(product._id, quantityToAdd);
        toast.success("Product added to cart");
      }
      await getProductDetails(id); // Await the refresh to ensure UI updates correctly
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setIsCartActionLoading(false);
    }
  };

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
            {user ? ( // Only show cart controls if user is logged in
              <>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDecrement}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantityToAdd}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border border-gray-300 rounded-md py-1"
                    min="1"
                  />
                  <button
                    onClick={handleIncrement}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleCartAction}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCartActionLoading}
                >
                  {isCartActionLoading
                    ? "Updating..."
                    : product.inCart
                    ? "Update Cart"
                    : "Add to Cart"}
                </button>
              </>
            ) : (
              <Link to='/login' className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                Login to add to cart
              </Link>
            )}
          </div>
        </div>
      </div>
      <Recommendation productId={id} />
    </div>
  );
};

export default ProductDetail;
