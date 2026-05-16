'use client';

import { useState, useEffect, useCallback } from "react";
import OrderTable from "@/components/dashboardComponents/OrderTable"; // Fixed import path
import useAxiosSecure from "@/hooks/useAxiosSecure"; // Fixed import path
import TableSkeleton from "@/components/loader/TableSkeleton"; // Fixed import path
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Create a reusable fetch function
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosSecure.get("/orders");
      
      // --- SMART EXTRACTION ---
      let data = response.data;
      if (data && data.data) data = data.data;
      if (data && data.orders) data = data.orders;
      
      if (Array.isArray(data)) {
        // Sort orders by date (newest first)
        const sortedData = data.reverse();
        setOrders(sortedData);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="bg-transparent h-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">All Orders</h1>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent h-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">All Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-16 rounded-xl shadow-sm border border-gray-100 text-center mt-8">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <ClipboardDocumentListIcon className="h-16 w-16 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 text-lg">
              When customers place orders, they will appear here.
            </p>
          </div>
        ) : (
          // Pass the fetchOrders function as a prop named 'refetch'
          <OrderTable orders={orders} refetch={fetchOrders} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;