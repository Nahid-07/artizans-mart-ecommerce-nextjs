"use client";

import { useState, useEffect, useContext } from "react";
import {
  ShoppingCartIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CheckCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context_API/authContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartCheckoutPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const { cartItems } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    address: "",
    note: "",
  });

  const [shippingFee, setShippingFee] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: prev.name || user?.displayName || "",
        email: prev.email || user?.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    let newshippingFee = 0;
    if (
      shippingInfo.area === "insideDhakaSouth" ||
      shippingInfo.area === "insideDhakaNorth"
    ) {
      newshippingFee = 70;
    } else if (shippingInfo.area === "Gazipur") {
      newshippingFee = 100;
    } else if (shippingInfo.area === "OutSideDhaka") {
      newshippingFee = 120;
    }
    setShippingFee(newshippingFee);
  }, [shippingInfo.area]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const cartSubtotal = cartItems.reduce((acc, item) => {
    return acc + (parseFloat(item.offer_price) || 0) * item.quantity;
  }, 0);

  const total = cartSubtotal + shippingFee;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    const orderItems = cartItems.map((item) => ({
      id: item._id,
      name: item.name || "Unknown Product",
      price: parseFloat(item.offer_price) || 0,
      quantity: item.quantity,
    }));

    const orderDetails = {
      shippingInfo,
      items: orderItems,
      shippingFee,
      total: total,
      date: formattedDate,
    };

    try {
      const res = await axiosPublic.post("/place-order", orderDetails);
      if (res.data) {
        toast.success("Order placed successfully!");

        const newOrderId = res.data.insertedId || res.data._id;

        router.push(`/thank-you?orderId=${newOrderId}`);
      }
    } catch (err) {
      console.error("Order Failed:", err);
      toast.error("Failed to process order. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Modern Empty State
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-[70vh] items-center justify-center bg-gray-50 pt-16">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCartIcon className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Modern Input Classes
  const inputClass =
    "mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
  const labelClass =
    "block text-sm font-bold text-gray-700 uppercase tracking-wide";

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Minimalist Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <div className="flex items-center text-blue-600">
            <CheckCircleIcon className="h-6 w-6 mr-2" />
            <span className="font-bold text-sm uppercase tracking-wider">
              Cart
            </span>
          </div>
          <div className="w-12 h-px bg-blue-600"></div>
          <div className="flex items-center text-blue-600">
            <div className="h-6 w-6 rounded-full border-2 border-blue-600 flex items-center justify-center mr-2">
              <span className="text-xs font-bold">2</span>
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Details
            </span>
          </div>
          <div className="w-12 h-px bg-gray-300"></div>
          <div className="flex items-center text-gray-400">
            <CreditCardIcon className="h-6 w-6 mr-2" />
            <span className="font-bold text-sm uppercase tracking-wider">
              Payment
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side: Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/5"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                Shipping Information
              </h2>

              <form
                id="checkout-form"
                onSubmit={handleConfirmOrder}
                className="space-y-8"
              >
                {/* Contact Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        required
                        className={inputClass}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                        className={inputClass}
                        placeholder="+880 1..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                    Delivery Details
                  </h3>
                  <div>
                    <label className={labelClass}>Delivery Area</label>
                    <div className="relative">
                      <select
                        name="area"
                        value={shippingInfo.area}
                        onChange={handleInputChange}
                        required
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select a delivery zone
                        </option>
                        <option value="insideDhakaSouth">
                          Dhaka (South) - ৳70
                        </option>
                        <option value="insideDhakaNorth">
                          Dhaka (North) - ৳70
                        </option>
                        <option value="Gazipur">Gazipur - ৳100</option>
                        <option value="OutSideDhaka">
                          Outside Of Dhaka - ৳120
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Complete Address</label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      required
                      className={inputClass}
                      placeholder="House, Road, Block, Area..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="note"
                      value={shippingInfo.note}
                      onChange={handleInputChange}
                      rows="2"
                      className={inputClass}
                      placeholder="e.g. Call before delivery, leave at front desk..."
                    />
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Side: Order Summary & Payment Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-2/5"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:sticky lg:top-28">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              {/* Cart Items List */}
              <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 shrink-0 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                        <Image
                          src={item.images?.[0] || "/placeholder.png"}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                          {item.quantity}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap pl-4">
                      ৳{(parseFloat(item.offer_price) || 0) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <span>Subtotal</span>
                  <span className="text-gray-900">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <span className="flex items-center">
                    <TruckIcon className="w-4 h-4 mr-1" /> Shipping Fee
                  </span>
                  {shippingFee > 0 ? (
                    <span className="text-gray-900">৳{shippingFee}</span>
                  ) : (
                    <span className="text-gray-400 italic">Select Area</span>
                  )}
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-end pt-4 border-t-2 border-gray-100 mb-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                    Total Due
                  </p>
                  <p className="text-sm text-gray-400">Cash on Delivery</p>
                </div>
                <span className="font-black text-3xl text-gray-900">
                  ৳{total}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || !shippingInfo.area}
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="h-6 w-6 mr-2" />
                    Place Order Now
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4 font-medium flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 mr-1" /> Your information is
                encrypted and secure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
