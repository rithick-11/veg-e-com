import React, { useState } from 'react';
import useStore from '../../store/store';

const Dashboard = () => {
  const addProduct = useStore((state) => state.addProduct);
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    unit: 'kg',
    discountPercentage: 0,
    stock: 0,
    category: 'Leafy Green',
    images: [''],
    isOrganic: false,
    origin: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'images') {
      setProductData({ ...productData, images: [value] });
    } else {
      setProductData({
        ...productData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation to ensure numbers are numbers
      const dataToSubmit = {
        ...productData,
        price: Number(productData.price),
        discountPercentage: Number(productData.discountPercentage),
        stock: Number(productData.stock),
      };
      await addProduct(dataToSubmit);
      alert('Product added successfully!');
      // Reset form
      setProductData({
        title: '',
        description: '',
        price: '',
        unit: 'kg',
        discountPercentage: 0,
        stock: 0,
        category: 'Leafy Green',
        images: [''],
        isOrganic: false,
        origin: '',
      });
    } catch (error) {
      alert('Failed to add product.');
      console.error(error);
    }
  };

  const units = ["kg", "g", "piece", "bunch", "dozen"];
  const categories = [
    "Leafy Green",
    "Root Vegetables",
    "Cruciferous",
    "Marrow",
    "Stem",
    "Alliums",
    "Fruits",
    "Herbs",
  ];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={productData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={productData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              id="price"
              value={productData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              name="unit"
              id="unit"
              value={productData.unit}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discountPercentage"
              id="discountPercentage"
              value={productData.discountPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            id="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="images"
            id="images"
            value={productData.images[0]}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
            <input
              type="text"
              name="origin"
              id="origin"
              value={productData.origin}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-start pt-6">
            <input
              id="isOrganic"
              name="isOrganic"
              type="checkbox"
              checked={productData.isOrganic}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="isOrganic" className="ml-2 block text-sm text-gray-900">Is Organic?</label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;