'use client'; 

import { useState, useEffect, useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/context_API/authContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Image from "next/image"; // ADDED: Next.js Image Component

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // 2. Fetch the product data with SMART EXTRACTION
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id === "undefined" || id === "null") {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosPublic.get(`/product/${id}`);
        
        // --- SMART EXTRACTION LOGIC ---
        let productObj = res.data;
        
        if (productObj && productObj.data) {
            productObj = productObj.data;
        } else if (productObj && productObj.product) {
            productObj = productObj.product;
        }

        if (Array.isArray(productObj)) {
            productObj = productObj[0];
        }
        
        setProductData(productObj);
      } catch (err) {
        console.error("Error fetching product for checkout:", err);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosPublic]);

  // 3. Calculate shipping fee
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

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const safePrice = parseFloat(productData?.offer_price) || 0;

    const orderDetails = {
      shippingInfo,
      items: [
        {
          id: productData?._id,
          name: productData?.name || "Unknown Product",
          price: safePrice,
          quantity: 1,
        },
      ],
      shippingFee,
      total: safePrice + shippingFee,
      date: formattedDate,
    };

    try {
      const res = await axiosPublic.post("/place-order", orderDetails);
      if (res.data) {
        toast.success("Order placed successfully!");
        router.push('/thank-you'); 
      }
    } catch (err) {
      console.error("Order Failed:", err);
      toast.error("Failed to process order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-500">Loading Checkout...</p>
      </div>
    );
  }

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const productPrice = parseFloat(productData.offer_price) || 0;
  const total = productPrice + shippingFee;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 mt-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Checkout
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Side: Customer Information Form */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Shipping Information
            </h3>
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select area
                </label>
                <select
                  name="area"
                  value={shippingInfo.area}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>
                    Select a delivery area
                  </option>
                  <option value="insideDhakaSouth">
                    Dhaka (South city corporation)
                  </option>
                  <option value="insideDhakaNorth">
                    Dhaka (North city corporation)
                  </option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="OutSideDhaka">Outside Of Dhaka</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes (optional)
                </label>
                <textarea
                  name="note"
                  value={shippingInfo.note}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
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
            <div className="space-y-6">
              {/* UPDATED: Product Image and Name Section */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {/* Product Image Square */}
                  <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                    <Image
                      src={productData?.images?.[0] || "/placeholder.png"}
                      alt={productData?.name || "Product Image"}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  {/* Product Name */}
                  <p className="font-semibold text-gray-900 line-clamp-2">
                    {productData?.name || "Product Name Loading..."}
                  </p>
                </div>
                {/* Product Price */}
                <p className="text-gray-600 font-medium ml-4">৳{productPrice}</p>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">৳{shippingFee}</span>
              </div>
            </div>

            <div className="flex justify-between font-extrabold text-2xl border-t-2 border-gray-200 pt-4 mt-4 text-gray-900">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}