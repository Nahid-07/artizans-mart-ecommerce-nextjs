'use client';

import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "@/hooks/useAxiosSecure"; // Needed to send the update

const OrderTable = ({ orders, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const formatArea = (area) => {
    switch (area) {
      case "insideDhakaSouth": return "Dhaka (South)";
      case "insideDhakaNorth": return "Dhaka (North)";
      case "OutSideDhaka": return "Outside Dhaka";
      default: return area;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Order ID copied!", { style: { fontSize: '14px' }});
  };

  // --- NEW: Handle Status Change ---
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // FIXED: URL updated to match your existing backend route!
      await axiosSecure.patch(`/orders/${orderId}`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      refetch(); 
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  // Helper to color-code the dropdown based on status
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 pb-20">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Products</th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
            {/* ADDED STATUS COLUMN HEADER */}
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors align-top">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-2">
                  <span className="truncate w-20" title={order._id}>{order._id}</span>
                  <button onClick={() => copyToClipboard(order._id)} className="text-gray-400 hover:text-blue-600 transition">
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                {order?.date || "N/A"}
              </td>

              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="font-semibold">{order.shippingInfo?.name}</div>
                <div>{order.shippingInfo?.phone}</div>
                <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md inline-block mt-1">
                  {formatArea(order.shippingInfo?.area)}
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="space-y-1">
                  {order.items?.map((pd, index) => (
                    <div key={index} className="line-clamp-1 max-w-50" title={pd.name}>
                      <span className="font-bold text-gray-500 mr-1">x{pd.quantity}</span> {pd.name}
                    </div>
                  ))}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="font-bold text-green-600 text-base">৳{order.total}</div>
              </td>

              {/* ADDED INTERACTIVE STATUS DROPDOWN */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <select
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`border font-bold text-xs rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors ${getStatusColor(order.status || 'Pending')}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;