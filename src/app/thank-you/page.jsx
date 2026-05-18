"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

// We extract the main content into a separate component so we can wrap it in Suspense
// (Next.js requires this when using useSearchParams to prevent build errors)
function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      toast.success("Order ID copied to clipboard!");
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Subtle celebratory background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-green-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center relative z-10"
      >
        {/* Animated Checkmark */}
        <motion.div
          variants={checkmarkVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
            <CheckCircleIcon className="h-24 w-24 text-green-500 relative z-10 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Headings */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-500 mb-8 max-w-lg mx-auto"
        >
          Thank you for shopping with Artizans' Mart. We're getting your order
          ready to be shipped.
        </motion.p>

        {/* THE "RELIEF" RECEIPT BLOCK */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-10 text-left relative overflow-hidden"
        >
          {/* Decorative jagged edge to look like a receipt */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIGZpbGw9IiNmOWZhZmIiIHBvaW50cz0iMCAwIDQgNCA4IDAgOCA4IDAgOCIvPjwvc3ZnPg==')] rotate-180"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Your Order ID
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-gray-900 font-mono tracking-tight">
                  {orderId || "Generating..."}
                </span>
                {orderId && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm"
                    title="Copy Order ID"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-500" />
              Receipt sent to email
            </div>
          </div>
        </motion.div>

        {/* Next Steps Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left"
        >
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start">
            <MapPinIcon className="h-8 w-8 text-blue-500 mr-4 shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Track Your Order</h3>
              <p className="text-sm text-gray-500">
                You can check the status of your delivery at any time using your
                Order ID.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start">
            <ShoppingBagIcon className="h-8 w-8 text-blue-500 mr-4 shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">What's Next?</h3>
              <p className="text-sm text-gray-500">
                We will carefully pack your items and notify you as soon as they
                ship.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/track_order"
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
          >
            Track Order Status
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-200 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center"
          >
            Continue Shopping <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Wrap the entire page export in a Suspense boundary
// This ensures Next.js handles the useSearchParams hook properly during the build process
export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
