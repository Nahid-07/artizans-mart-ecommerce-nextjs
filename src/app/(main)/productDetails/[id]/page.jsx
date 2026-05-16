'use client'; 

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import ProductReviews from "@/components/ProductReviews"; 
import { useEffect, useState } from "react";
import { renderStars } from "@/components/RenderStars"; // FIXED: Updated to the correct path
import { useCart } from "@/hooks/useCart"; 
import useAxiosPublic from "@/hooks/useAxiosPublic";

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
        
        // --- SMART EXTRACTION LOGIC ---
        let productObj = productRes.data;
        
        // Unwrap if inside 'data' or 'product'
        if (productObj && productObj.data) {
            productObj = productObj.data;
        } else if (productObj && productObj.product) {
            productObj = productObj.product;
        }

        // Unwrap if inside an array
        if (Array.isArray(productObj)) {
            productObj = productObj[0];
        }
        
        setProductData(productObj);
        
        // Safely set the main image using the extracted object
        if (productObj?.images?.length > 0) {
          setMainImage(productObj.images[0]);
        }

        // Fetch reviews and filter for this product
        const reviewsRes = await axiosPublic.get(`/reviews`);
        const matchingReviews = reviewsRes.data.filter(
          (review) => review.productId === id
        );
        setFilterRiview(matchingReviews);

      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id, axiosPublic]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Loading product details...</p>
      </div>
    );
  }

  // Check if extraction failed
  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link href="/shop" className="text-blue-600 hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Side: Product Images */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-square flex items-center justify-center bg-gray-100">
              <Image
                src={mainImage || "/placeholder.png"}
                alt={productData.name || "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4" 
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              {productData?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    mainImage === image
                      ? "border-blue-600 opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {productData.name}
            </h1>
            <p className="mt-2 text-xl font-semibold text-gray-700">
              {productData.brand}
            </p>

            <div className="mt-4 flex items-center space-x-2">
              {renderStars(productData.rating)}
              <span className="text-gray-600 text-sm">
                ({filterRiview?.length || 0} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline space-x-3">
              <p className="text-4xl font-bold text-blue-600">
                ৳{productData.offer_price}
              </p>
              {productData.regular_price && (
                <p className="text-lg text-gray-500 line-through">
                  ৳{productData.regular_price}
                </p>
              )}
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
              {productData.long_description}
            </p>

            {productData.stock_status === "out_of_stock" ? (
              <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                Currently Out of Stock
              </div>
            ) : (
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAddToCart(productData)}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-transform active:scale-95 shadow-lg"
                >
                  <ShoppingCartIcon className="h-6 w-6 mr-2" />
                  Add to Cart
                </button>
                {/* FIXED: Using 'id' directly from params instead of productData._id */}
                <Link href={`/checkout/${id}`} className="flex-1">
                  <button className="w-full h-full flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors">
                    Buy Now
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {productData.features?.length > 0 && (
          <div className="mt-20 border-t pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Product Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full shrink-0"></span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ProductReviews productId={productData._id || id} initialReviews={filterRiview} />
    </div>
  );
}