import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, handleQuantityChange, handleRemoveFromCart }) => {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <img
          src={item.product.images[0]}
          alt={item.product.title}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{item.product.title}</h2>
          <p className="text-gray-500">Price: ₹{item.product.finalPrice}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            handleQuantityChange(item.product._id, parseInt(e.target.value))
          }
          className="w-16 px-2 py-1 border rounded-md text-center"
        />
        <button
          onClick={() => handleRemoveFromCart(item.product._id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
