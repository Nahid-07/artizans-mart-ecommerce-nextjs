'use client'; 

import { useState, useEffect, useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context_API/authContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useCart } from "@/hooks/useCart"; // Import cart context
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function CartCheckoutPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  
  // Pull data directly from the Cart instead of fetching an ID
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

  // 1. Auto-fill user data
  useEffect(() => {
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: prev.name || user?.displayName || "",
        email: prev.email || user?.email || "",
      }));
    }
  }, [user]);

  // 2. Calculate shipping fee
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
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  // 3. Calculate Cart Total dynamically
  const cartSubtotal = cartItems.reduce((acc, item) => {
    return acc + (parseFloat(item.offer_price) || 0) * item.quantity;
  }, 0);
  
  const total = cartSubtotal + shippingFee;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    // Map all cart items into the order payload
    const orderItems = cartItems.map(item => ({
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
        // Optional: If your useCart hook has a clearCart() function, call it here!
        router.push('/thank-you'); 
      }
    } catch (err) {
      console.error("Order Failed:", err);
      toast.error("Failed to process order. Please try again.");
    }
  };

  // If the user somehow gets here with an empty cart, block them
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Add some products before proceeding to checkout.</p>
        <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 mt-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Cart Checkout
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Side: Customer Information Form */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Shipping Information
            </h3>
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={shippingInfo.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                <input type="email" name="email" value={shippingInfo.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Area</label>
                <select name="area" value={shippingInfo.area} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 bg-white">
                  <option value="" disabled>Select a delivery area</option>
                  <option value="insideDhakaSouth">Dhaka (South)</option>
                  <option value="insideDhakaNorth">Dhaka (North)</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="OutSideDhaka">Outside Of Dhaka</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea name="address" value={shippingInfo.address} onChange={handleInputChange} rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                <textarea name="note" value={shippingInfo.note} onChange={handleInputChange} rows="2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mt-8">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Confirm Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white rounded-lg shadow-xl p-8 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Order Summary
            </h3>
            
            {/* List all items currently in the cart */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6 border-b border-gray-100 pb-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden">
                      <Image 
                        src={item.images?.[0] || "/placeholder.png"} 
                        alt={item.name} 
                        fill 
                        sizes="48px" 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    ৳{(parseFloat(item.offer_price) || 0) * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>৳{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 border-b border-dashed border-gray-300 pb-4">
                <span>Shipping:</span>
                <span>৳{shippingFee}</span>
              </div>
            </div>

            <div className="flex justify-between font-extrabold text-2xl pt-4 mt-4 text-gray-900">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}