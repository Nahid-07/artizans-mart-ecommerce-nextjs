"use client";

import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const OrderTable = ({ orders, refetch }) => {
  // Helper to format area strings into human-readable text
  const formatArea = (area) => {
    switch (area) {
      case "insideDhakaSouth":
        return "Dhaka (South)";
      case "insideDhakaNorth":
        return "Dhaka (North)";
      case "OutSideDhaka":
        return "Outside Dhaka";
      default:
        return area;
    }
  };

  // Helper to copy Order ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Order ID copied to clipboard!", {
      style: { fontSize: "14px" },
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Contact & Zone
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Products
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Qty
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Total Price
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Note
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 transition-colors align-top"
            >
              {/* Order ID */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-2">
                  <span className="truncate w-20" title={order._id}>
                    {order._id}
                  </span>
                  <button
                    onClick={() => copyToClipboard(order._id)}
                    className="text-gray-400 hover:text-blue-600 transition"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>

              {/* Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                {order?.date || "N/A"}
              </td>

              {/* Customer Info */}
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="font-semibold">{order.shippingInfo?.name}</div>
                <div
                  className="text-gray-500 text-xs mt-1 max-w-[200px] break-words line-clamp-2"
                  title={order.shippingInfo?.address}
                >
                  {order.shippingInfo?.address}
                </div>
              </td>

              {/* Contact & Zone */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{order.shippingInfo?.phone}</div>
                <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md inline-block mt-1">
                  {formatArea(order.shippingInfo?.area)}
                </div>
              </td>

              {/* Products (Fixed Multi-Item Mapping) */}
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="space-y-2">
                  {order.items?.map((pd, index) => (
                    <div
                      key={index}
                      className="line-clamp-1 max-w-[200px]"
                      title={pd.name}
                    >
                      • {pd.name}
                    </div>
                  ))}
                </div>
              </td>

              {/* Quantities */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                <div className="space-y-2">
                  {order.items?.map((pd, index) => (
                    <div
                      key={index}
                      className="font-medium bg-gray-100 rounded px-2"
                    >
                      x{pd.quantity}
                    </div>
                  ))}
                </div>
              </td>

              {/* Total Price */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="font-bold text-green-600 text-base">
                  ৳{order.total}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Includes ৳{order.shippingFee || 0} Shipping
                </div>
              </td>

              {/* Notes */}
              <td className="px-6 py-4 text-sm text-gray-500">
                {order.shippingInfo?.note ? (
                  <div className="italic text-gray-600 bg-yellow-50 p-2 rounded-md text-xs max-w-[150px] break-words">
                    "{order.shippingInfo.note}"
                  </div>
                ) : (
                  <span className="text-gray-300">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
