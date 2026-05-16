'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure"; // FIXED: Updated import path

const ProductAddForm = () => {
  const axiosSecure = useAxiosSecure();
  const inputFieldClasses = "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none p-3";
  
  // Stored initial state so we can reset the form easily later
  const initialState = {
    name: "",
    brand: "",
    regular_price: "",
    offer_price: "",
    rating: "",
    reviews_count: 0,
    category: "",
    is_featured: false,
    stock_status: "in_stock",
    short_description: "",
    long_description: "",
    images: [],
    features: [],
  };

  const [productData, setProductData] = useState(initialState);
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

  const categories = [
    "Smart Watch",
    "Powerbank",
    "Earbuds",
    "Gaming Accessories",
    "Headphones",
    "Cables & Adapters",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setProductData({
        ...productData,
        features: [...productData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = productData.features.filter((_, i) => i !== index);
    setProductData({ ...productData, features: updatedFeatures });
  };

  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      setProductData({
        ...productData,
        images: [...productData.images, newImage.trim()],
      });
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!productData.category) {
        setError("Please select a product category.");
        return;
    }

    const regularPrice = parseFloat(productData.regular_price);
    const offerPrice = parseFloat(productData.offer_price);

    if (offerPrice >= regularPrice) {
      setError("Offer price must be less than the regular price.");
      return;
    }

    if (productData.images.length === 0) {
      setError("Please add at least one image URL.");
      return;
    }

    setIsSubmitting(true);

    const dataToSend = {
      ...productData,
      regular_price: regularPrice,
      offer_price: offerPrice,
      rating: parseFloat(productData.rating) || 0,
      reviews_count: 0,
    };

    axiosSecure.post("/addProduct", dataToSend)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Product has been added successfully!");
          // Form Reset
          setProductData(initialState);
          setNewFeature("");
          setNewImage("");
        } else {
          toast.error("Failed to add product. Please try again.");
        }
      })
      .catch((err) => {
        setError("Network error. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-transparent py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Add New Product
        </h2>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-center text-red-600 rounded-md font-medium border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product and Brand Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                className={inputFieldClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                required
                className={inputFieldClasses}
              />
            </div>
          </div>
          
          {/* Price and Rating Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Regular Price (৳)</label>
              <input
                type="number"
                name="regular_price"
                value={productData.regular_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className={inputFieldClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Offer Price (৳)</label>
              <input
                type="number"
                name="offer_price"
                value={productData.offer_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className={inputFieldClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={productData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                className={inputFieldClasses}
              />
            </div>
          </div>
          
          {/* Category, Stock, and Featured Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
                className={inputFieldClasses + " bg-white"}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Status</label>
              <select
                name="stock_status"
                value={productData.stock_status}
                onChange={handleInputChange}
                className={inputFieldClasses + " bg-white"}
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={productData.is_featured}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5 cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">Mark as Featured Product</span>
            </label>
          </div>
          
          {/* Description Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              name="short_description"
              value={productData.short_description}
              onChange={handleInputChange}
              rows="3"
              required
              className={inputFieldClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Long Description</label>
            <textarea
              name="long_description"
              value={productData.long_description}
              onChange={handleInputChange}
              rows="5"
              required
              className={inputFieldClasses}
            />
          </div>

          {/* Dynamic Features Input */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">Features List</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                placeholder="e.g., Active Noise Cancellation"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-black transition font-semibold"
              >
                Add
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {productData.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  <span className="text-sm text-gray-700">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Images Input */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Image URLs</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                placeholder="https://example.com/image.jpg"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-black transition font-semibold"
              >
                Add
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {productData.images.map((image, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  <span className="text-sm text-blue-600 truncate mr-4"><a href={image} target="_blank" rel="noreferrer">{image}</a></span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding Product..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;