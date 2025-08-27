import React from "react";
import { categories } from "../utils/data";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="my-4">
      <h1 className="title">Categories</h1>
      <ul className="flex gap-4">
        {categories.map((category, i) => (
          <li key={i} className="relative hover:scale-105 transition-all duration-200 flex flex-col items-center gap-1">
            <Link className="absolute inset-0" to={category.link}></Link>
            <img
              src={category.image}
              className="h-16 w-16 md:h-28 md:w-28 shadow-2xl rounded-full object-cover aspect-square"
            />
            <h2 className="text-sm md:text-lg text-center font-light">{category.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
