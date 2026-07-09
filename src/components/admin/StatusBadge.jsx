
import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          status === "Pending"
            ? "bg-yellow-500"
            : status === "Processing"
            ? "bg-blue-500"
            : status === "Shipped"
            ? "bg-purple-500"
            : status === "Delivered"
            ? "bg-green-500"
            : status === "Cancelled"
            ? "bg-red-500"
            : "bg-gray-500"
        }`}
      ></span>

      {status}
    </span>
  );
};

export default StatusBadge;
