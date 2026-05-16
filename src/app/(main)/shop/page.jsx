'use client';

import { useEffect, useState } from "react";
import Link from "next/link"; 
import { useParams } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { renderStars } from "@/components/RenderStars";

export default function ShopPage() {
  const params = useParams();
  const category = params?.category;
  const axiosPublic = useAxiosPublic();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  // Filter State
  const [filters, setFilters] = useState({
    category: category || "All",
    priceRange: "All",
    rating: 0,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: category || "All" }));
    setCurrentPage(0);
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?page=${currentPage}&limit=${itemsPerPage}`;
        const res = await axiosPublic.get(url);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, axiosPublic]);

  const displayedProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "All" || product.category === filters.category;
    const ratingMatch = product.rating >= filters.rating;
    return categoryMatch && ratingMatch;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 mt-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our Products
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="All">All</option>
                <option value="Powerbank">Powerbank</option>
                <option value="Earbuds">Earbuds</option>
                <option value="Smartwatch">Smartwatch</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    rating: parseFloat(e.target.value),
                  })
                }
              >
                <option value="0">All</option>
                <option value="4.5">4.5 Stars & Up</option>
                <option value="4.0">4.0 Stars & Up</option>
                <option value="3.0">3.0 Stars & Up</option>
              </select>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {displayedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <Link href={`/productDetails/${product._id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          <Link href={`/productDetails/${product._id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.brand}
                        </p>
                        <div className="flex items-center my-2">
                          {renderStars(product.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">
                          ৳{product.offer_price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {displayedProducts.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    <p>No products match your filters.</p>
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={`w-10 h-10 rounded-full font-medium transition-colors ${
                        currentPage === index
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 rounded-full border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}