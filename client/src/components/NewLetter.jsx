import React from "react";

const NewLetter = () => {
  return (
    <section className="my-8 py-16 bg-blue-50 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2551794/pexels-photo-2551794.jpeg"
          alt="A basket of fresh vegetables"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-blue-50/10 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Stay Fresh!
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter for the latest deals, newest arrivals, and freshest recipes delivered right to your inbox.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 text-gray-700 bg-white border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewLetter;
