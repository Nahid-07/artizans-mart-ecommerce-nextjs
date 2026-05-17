"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { renderStars } from "@/components/RenderStars";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const params = useParams();
  const category = params?.category;
  const axiosPublic = useAxiosPublic();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW: Mobile Filter Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  // Filter State
  const [filters, setFilters] = useState({
    category: category || "All",
    rating: 0,
  });

  const categoryOptions = [
    "All",
    "Powerbank",
    "Earbuds",
    "Smartwatch",
    "Gaming",
    "Accessories",
  ];
  const ratingOptions = [
    { label: "All Ratings", value: 0 },
    { label: "4.5 Stars & Up", value: 4.5 },
    { label: "4.0 Stars & Up", value: 4 },
    { label: "3.0 Stars & Up", value: 3 },
  ];

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
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, axiosPublic]);

  const displayedProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "All" || product.category === filters.category;
    const ratingMatch = (product.rating || 0) >= filters.rating;
    return categoryMatch && ratingMatch;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium electronics and
            accessories designed for the modern lifestyle.
          </p>
        </div>

        {/* NEW: Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <p className="text-sm font-bold text-gray-500">
            {displayedProducts.length} Products
          </p>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-bold text-gray-900 hover:bg-gray-50 transition"
          >
            <FunnelIcon className="h-5 w-5 mr-2 text-blue-600" />
            Filters{" "}
            {filters.category !== "All" || filters.rating > 0 ? "(Active)" : ""}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* NEW: Mobile Backdrop Overlay */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Filters Sidebar / Mobile Drawer */}
          <div
            className={`
            fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto
            lg:relative lg:translate-x-0 lg:w-1/4 lg:bg-transparent lg:shadow-none lg:p-0 lg:z-0 lg:overflow-visible
            ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100 lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>
                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full transition"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Pill Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        filters.category === cat
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimalist Rating List (FIXED BUG) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Minimum Rating
                </h3>
                <div className="space-y-3">
                  {ratingOptions.map((rate) => (
                    <label
                      key={rate.label}
                      onClick={() =>
                        setFilters({ ...filters, rating: rate.value })
                      } // <-- ADDED ONCLICK HERE
                      className="flex items-center cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          filters.rating === rate.value
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 bg-white group-hover:border-blue-400"
                        }`}
                      >
                        {filters.rating === rate.value && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`ml-3 text-sm font-medium transition-colors ${
                          filters.rating === rate.value
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {rate.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile "Apply" Button */}
              <div className="mt-10 lg:hidden">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {displayedProducts.length > 0 ? (
                    <motion.div
                      key="grid"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
                    >
                      {displayedProducts.map((product) => (
                        <motion.div key={product._id} variants={cardVariants}>
                          <Link
                            href={`/productDetails/${product._id}`}
                            className="block group"
                          >
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                              <div className="relative h-56 bg-gray-50 overflow-hidden">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                                {product.offer_price <
                                  product.regular_price && (
                                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    SALE
                                  </div>
                                )}
                              </div>

                              <div className="p-5">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                  {product.brand}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 truncate mb-2 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </h3>

                                <div className="flex items-center mb-4">
                                  {renderStars(product.rating || 0)}
                                  <span className="ml-2 text-xs font-medium text-gray-500">
                                    ({product.reviews_count || 0})
                                  </span>
                                </div>

                                <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                                  <div>
                                    <p className="text-xl font-extrabold text-gray-900">
                                      ৳{product.offer_price}
                                    </p>
                                    {product.regular_price >
                                      product.offer_price && (
                                      <p className="text-xs text-gray-400 line-through mt-0.5">
                                        ৳{product.regular_price}
                                      </p>
                                    )}
                                  </div>
                                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <ChevronRightIcon className="w-5 h-5" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-200"
                    >
                      <div className="bg-gray-50 p-6 rounded-full mb-6">
                        <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-500 max-w-sm mx-auto mb-6">
                        We couldn't find anything matching your current filters.
                        Try adjusting your category or rating criteria.
                      </p>
                      <button
                        onClick={() =>
                          setFilters({ category: "All", rating: 0 })
                        }
                        className="text-blue-600 font-bold bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {totalPages > 1 && displayedProducts.length > 0 && (
                  <div className="flex justify-center items-center space-x-2 mt-12 pt-8 border-t border-gray-200">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    <div className="flex space-x-1">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index)}
                          className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                            currentPage === index
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                              : "bg-transparent text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages - 1}
                      className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
