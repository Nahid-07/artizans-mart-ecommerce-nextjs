'use client';

import { useState } from "react";
import { MagnifyingGlassIcon, CheckCircleIcon, MapPinIcon, TruckIcon, PackageIcon } from "@heroicons/react/24/solid";
import { CubeIcon } from "@heroicons/react/24/outline";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await axiosPublic.get(`/orders/track/${orderId.trim()}`);
      setOrderData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Order not found. Please check your Order ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine which steps are active based on status
  const getStepStatus = (currentStatus, step) => {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentIndex = statuses.indexOf(currentStatus || "Pending");
    const stepIndex = statuses.indexOf(step);

    if (currentStatus === "Cancelled") return step === "Pending" ? "complete" : "cancelled";
    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Track Your Order</h1>
          <p className="mt-4 text-lg text-gray-500">
            Enter your Order ID below to see the current status of your package.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="relative grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Paste your Order ID here (e.g., 65f1a...)"
                className="block w-full pl-11 pr-4 py-4 border-gray-300 bg-gray-50 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium outline-none border transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition disabled:bg-blue-400 whitespace-nowrap"
            >
              {loading ? "Searching..." : "Track Package"}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        {/* Results Section */}
        {orderData && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Order Details</p>
                <h3 className="text-xl font-bold text-gray-900">ID: {orderData._id}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium mb-1">Total Amount</p>
                <p className="text-xl font-bold text-blue-600">৳{orderData.total}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Visual Timeline */}
              {orderData.status === "Cancelled" ? (
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                  <h4 className="text-red-700 font-bold text-xl mb-2">Order Cancelled</h4>
                  <p className="text-red-500">This order has been cancelled and will not be shipped.</p>
                </div>
              ) : (
                <div className="relative mb-12 mt-4">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
                  
                  {/* Dynamic Progress Bar */}
                  <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ 
                      width: 
                        orderData.status === 'Processing' ? '33%' : 
                        orderData.status === 'Shipped' ? '66%' : 
                        orderData.status === 'Delivered' ? '100%' : '0%' 
                    }}
                  ></div>

                  <div className="relative flex justify-between">
                    {/* Step 1: Pending */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${getStepStatus(orderData.status, 'Pending') === 'complete' || getStepStatus(orderData.status, 'Pending') === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <CheckCircleIcon className="h-6 w-6" />
                      </div>
                      <p className={`mt-3 text-sm font-bold ${getStepStatus(orderData.status, 'Pending') === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>Order Placed</p>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${getStepStatus(orderData.status, 'Processing') === 'complete' || getStepStatus(orderData.status, 'Processing') === 'current' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                        <CubeIcon className="h-5 w-5" />
                      </div>
                      <p className={`mt-3 text-sm font-bold ${getStepStatus(orderData.status, 'Processing') === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>Processing</p>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${getStepStatus(orderData.status, 'Shipped') === 'complete' || getStepStatus(orderData.status, 'Shipped') === 'current' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                        <TruckIcon className="h-5 w-5" />
                      </div>
                      <p className={`mt-3 text-sm font-bold ${getStepStatus(orderData.status, 'Shipped') === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>Shipped</p>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${getStepStatus(orderData.status, 'Delivered') === 'current' ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                        <MapPinIcon className="h-5 w-5" />
                      </div>
                      <p className={`mt-3 text-sm font-bold ${getStepStatus(orderData.status, 'Delivered') === 'current' ? 'text-green-600' : 'text-gray-400'}`}>Delivered</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Breakdown */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Items in this shipment</h4>
                <ul className="space-y-3">
                  {orderData.items?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-700">
                        <span className="font-bold bg-white border border-gray-200 rounded px-2 py-1 mr-3 text-gray-500">x{item.quantity}</span>
                        {item.name}
                      </div>
                      <span className="font-semibold text-gray-900">৳{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}