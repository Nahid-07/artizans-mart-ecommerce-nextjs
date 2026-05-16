"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation"; // NEXT.JS ROUTING HOOKS
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ProductUpdateForm = () => {
  const inputFieldClas =
    "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none p-3";

  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const categories = [
    "Smart Watch",
    "Powerbank",
    "Earbuds",
    "Gaming Accessories",
    "Headphones",
    "Cables & Adapters",
  ];

  const [productData, setProductData] = useState({
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
  });

  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading state for initial fetch

  // FETCH INITIAL DATA
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      try {
        const res = await axiosSecure.get(`/product/${id}`);

        // Smart Extraction in case it's wrapped
        let data = res.data;
        if (data && data.data) data = data.data;
        if (data && data.product) data = data.product;
        if (Array.isArray(data)) data = data[0];

        // Populate the state with the fetched data
        setProductData({
          name: data.name || "",
          brand: data.brand || "",
          regular_price: data.regular_price || "",
          offer_price: data.offer_price || "",
          rating: data.rating || "",
          reviews_count: data.reviews_count || 0,
          category: data.category || "",
          is_featured: data.is_featured || false,
          stock_status: data.stock_status || "in_stock",
          short_description: data.short_description || "",
          long_description: data.long_description || "",
          images: data.images || [],
          features: data.features || [],
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product data.");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProductData();
  }, [id, axiosSecure]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!productData.category) {
      toast.error("Please select a product category.");
      setIsSubmitting(false);
      return;
    }

    const regularPrice = parseFloat(productData.regular_price);
    const offerPrice = parseFloat(productData.offer_price);

    if (offerPrice >= regularPrice) {
      toast.error("Offer price must be less than the regular price.");
      setIsSubmitting(false);
      return;
    }

    const updatedProductData = {
      ...productData,
      regular_price: regularPrice,
      offer_price: offerPrice,
      rating: parseFloat(productData.rating) || 0,
    };

    try {
      const res = await axiosSecure.put(
        `/update-product/${id}`,
        updatedProductData,
      );

      const resultData = res.data;

      if (
        resultData.result?.modifiedCount > 0 ||
        resultData.modifiedCount > 0
      ) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/all_product"); // FIXED ROUTE
      } else if (
        (resultData.result?.matchedCount > 0 &&
          resultData.result?.modifiedCount === 0) ||
        (resultData.matchedCount > 0 && resultData.modifiedCount === 0)
      ) {
        toast.success("No changes were made to the product.");
        router.push("/dashboard/all_product"); // FIXED ROUTE
      } else {
        toast.error(resultData.message || "Failed to update product.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "An error occurred while updating.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-transparent py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Update Product:{" "}
          <span className="text-blue-600">{productData.name}</span>
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Product and Brand Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                className={inputFieldClas}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                required
                className={inputFieldClas}
              />
            </div>
          </div>

          {/* Price and Rating Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Regular Price (৳)
              </label>
              <input
                type="number"
                name="regular_price"
                value={productData.regular_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className={inputFieldClas}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Offer Price (৳)
              </label>
              <input
                type="number"
                name="offer_price"
                value={productData.offer_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className={inputFieldClas}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating (0-5)
              </label>
              <input
                type="number"
                name="rating"
                value={productData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                className={inputFieldClas}
              />
            </div>
          </div>

          {/* Category, Stock, and Featured Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
                className={inputFieldClas + " bg-white"}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Status
              </label>
              <select
                name="stock_status"
                value={productData.stock_status}
                onChange={handleInputChange}
                className={inputFieldClas + " bg-white"}
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
              <span className="ml-3 text-sm font-medium text-gray-700">
                Mark as Featured Product
              </span>
            </label>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              name="short_description"
              value={productData.short_description}
              onChange={handleInputChange}
              rows="3"
              required
              className={inputFieldClas}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Long Description
            </label>
            <textarea
              name="long_description"
              value={productData.long_description}
              onChange={handleInputChange}
              rows="5"
              required
              className={inputFieldClas}
            />
          </div>

          {/* Dynamic Features Input */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Features
            </label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
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
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Image URLs
            </label>
            <div className="flex space-x-2 mt-1">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddImage();
                  }
                }}
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
                  <span className="text-sm text-blue-600 truncate mr-4">
                    <a href={image} target="_blank" rel="noreferrer">
                      {image}
                    </a>
                  </span>
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
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white transition-colors duration-300 ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating Database..." : "Save Product Updates"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
