'use client'; // Required because we use useState, useEffect, and useCart

import {
  ShoppingCartIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link"; // Updated to Next.js Link
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart"; // Make sure this path is correct for your setup

export default function CartPage() {
  const [cartTotal, setCartTotal] = useState(0);
  const { cartItems, handleRemoveItem, handleUpdateQuantity } = useCart();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.offer_price * item.quantity;
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          // Improved Empty State
          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm text-center max-w-2xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <ShoppingCartIcon className="h-20 w-20 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Explore
              our products and find something you love!
            </p>
            <Link
              href="/shop" // Changed 'to' to 'href'
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="hidden md:flex justify-between border-b pb-4 mb-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <span className="w-1/2">Product</span>
                <span className="w-1/4 text-center">Quantity</span>
                <span className="w-1/4 text-right">Total</span>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between border-b last:border-0 py-6 gap-4"
                >
                  <div className="flex items-center space-x-4 w-full md:w-1/2">
                    {/* Using standard img for now. You can upgrade to next/image later once domains are configured */}
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <div>
                      <Link
                        href={`/productDetails/${item._id}`} // Changed 'to' to 'href'
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm font-medium text-blue-600 md:hidden">
                        ৳{item.offer_price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-1/2">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-bold text-gray-900 hidden md:block w-24">
                      ৳{(item.offer_price * item.quantity).toFixed(0)}
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                      title="Remove Item"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/4 h-fit">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-4 mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ৳{cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold text-2xl text-gray-900 mb-6">
                  <span>Total</span>
                  <span>৳{cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout"> {/* Changed 'to' to 'href' */}
                  <button className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95">
                    Proceed to Checkout
                  </button>
                </Link>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}