"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { renderStars } from "@/components/RenderStars";
import ProductSkeleton from "@/components/loader/ProductSkeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  // Fetch a handful of products for the carousel
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Grabbing 8 products to fill the carousel
        const res = await axiosPublic.get(`/products?page=0&limit=8`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [axiosPublic]);

  // Smooth scroll logic for the custom carousel buttons
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white py-24 relative overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Carousel Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              Trending Now
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Our Bestsellers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <Link
              href="/shop"
              className="hidden sm:flex items-center text-blue-600 font-bold hover:text-blue-800 transition mr-4 group"
            >
              View Collection
              <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Custom Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                aria-label="Scroll Left"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                aria-label="Scroll Right"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Track */}
        <div className="relative -mx-4 sm:mx-0">
          {loading ? (
            <div className="flex gap-6 overflow-hidden px-4 sm:px-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-70 sm:min-w-[320px] shrink-0"
                >
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              ref={carouselRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-0 pb-10 pt-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides scrollbar on Firefox/IE
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="min-w-70 sm:min-w-[320px] max-w-[320px] shrink-0 snap-start group"
                >
                  <Link
                    href={`/productDetails/${product._id}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative h-64 bg-gray-50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
                        <Image
                          src={product.images?.[0] || "/placeholder.png"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover mix-blend-multiply transform transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Interactive Add to Cart Overlay */}
                        <div className="absolute inset-0 bg-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white text-gray-900 rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <ShoppingCartIcon className="w-6 h-6" />
                          </div>
                        </div>
                        {/* Sale Badge */}
                        {product.offer_price < product.regular_price && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            SALE
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="grow flex flex-col">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {product.brand}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center mb-4">
                          {renderStars(product.rating || 0)}
                          <span className="ml-2 text-xs font-medium text-gray-500">
                            ({product.reviews_count || 0})
                          </span>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-end gap-2">
                          <p className="text-2xl font-extrabold text-gray-900">
                            ৳{product.offer_price}
                          </p>
                          {product.regular_price > product.offer_price && (
                            <p className="text-sm text-gray-400 line-through mb-1 font-medium">
                              ৳{product.regular_price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition group"
          >
            View All Collection
            <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Global Style to hide scrollbar for webkit browsers (Chrome/Safari) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `,
        }}
      />
    </div>
  );
};

export default FeaturedProducts;
