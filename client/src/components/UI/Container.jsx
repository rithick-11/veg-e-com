import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full sm:w-[90%] md:w-[80%] lg:w-[75%] mx-auto px-2 sm:px-0 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
