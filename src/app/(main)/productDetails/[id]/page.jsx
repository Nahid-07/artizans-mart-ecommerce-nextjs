"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ShoppingCartIcon,
  BoltIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import ProductReviews from "@/components/ProductReviews";
import { useEffect, useState } from "react";
import { renderStars } from "@/components/RenderStars";
import { useCart } from "@/hooks/useCart";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id;
  const axiosPublic = useAxiosPublic();
  const { handleAddToCart } = useCart();

  const [productData, setProductData] = useState(null);
  const [filterRiview, setFilterRiview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRes = await axiosPublic.get(`/product/${id}`);

        let productObj = productRes.data;
        if (productObj && productObj.data) productObj = productObj.data;
        else if (productObj && productObj.product)
          productObj = productObj.product;
        if (Array.isArray(productObj)) productObj = productObj[0];

        setProductData(productObj);

        if (productObj?.images?.length > 0) {
          setMainImage(productObj.images[0]);
        }

        const reviewsRes = await axiosPublic.get(`/reviews`);
        const matchingReviews = reviewsRes.data.filter(
          (review) => review.productId === id,
        );
        setFilterRiview(matchingReviews);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id, axiosPublic]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-bold text-gray-500 tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            The item you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link
            href="/shop"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-blue-600 transition">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-50 sm:max-w-xs">
            {productData.name}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          {/* LEFT: Sticky Image Gallery */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-8"
            >
              <Image
                src={mainImage || "/placeholder.png"}
                alt={productData.name || "Product Image"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 mix-blend-multiply transition-transform duration-500 hover:scale-110"
                priority
              />
              {/* Sale Badge Overlay */}
              {productData.offer_price < productData.regular_price && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Sale
                </div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {productData?.images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 ${
                      mainImage === image
                        ? "border-blue-600 shadow-md scale-105"
                        : "border-transparent shadow-sm opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full lg:w-1/2 flex flex-col"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
                {productData.brand}
              </h2>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {productData.name}
              </h1>
            </motion.div>

            {/* Ratings */}
            <motion.div
              variants={fadeUp}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="flex items-center">
                {renderStars(productData.rating || 0)}
              </div>
              <a
                href="#reviews"
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition underline-offset-4 hover:underline"
              >
                Read {filterRiview?.length || 0} Reviews
              </a>
            </motion.div>

            {/* Pricing Section */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8"
            >
              <div className="flex items-end gap-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-900">
                  ৳{productData.offer_price}
                </span>
                {productData.regular_price > productData.offer_price && (
                  <div className="flex flex-col pb-1">
                    <span className="text-lg text-gray-400 line-through font-medium">
                      ৳{productData.regular_price}
                    </span>
                    <span className="text-sm font-bold text-green-500">
                      Save ৳
                      {productData.regular_price - productData.offer_price}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Taxes and shipping calculated at checkout.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-lg leading-relaxed mb-10 whitespace-pre-line"
            >
              {productData.long_description}
            </motion.p>

            {/* Actions */}
            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              {productData.stock_status === "out_of_stock" ? (
                <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl text-center font-bold text-lg border border-gray-200">
                  Currently Out of Stock
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(productData)}
                    className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-95"
                  >
                    <ShoppingCartIcon className="h-6 w-6 mr-3" />
                    Add to Cart
                  </button>
                  <Link href={`/checkout/${id}`} className="flex-1">
                    <button className="w-full bg-white text-gray-900 border-2 border-gray-200 py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center hover:border-gray-900 transition-colors duration-300">
                      <BoltIcon className="h-6 w-6 mr-2" />
                      Buy it Now
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* The "Trust Bar" */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200 mb-10"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <TruckIcon className="h-7 w-7 text-gray-400" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheckIcon className="h-7 w-7 text-gray-400" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Secure Checkout
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <ArrowPathIcon className="h-7 w-7 text-gray-400" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Easy Returns
                </span>
              </div>
            </motion.div>

            {/* Features Grid */}
            {productData.features?.length > 0 && (
              <motion.div variants={fadeUp} className="mb-12">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {productData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start"
                    >
                      <div className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full shrink-0"></div>
                      <span className="text-gray-700 font-medium text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Reviews Section Anchor */}
      <div id="reviews" className="mt-16 bg-white border-t border-gray-100">
        <ProductReviews
          productId={productData._id || id}
          initialReviews={filterRiview}
        />
      </div>
    </div>
  );
}
