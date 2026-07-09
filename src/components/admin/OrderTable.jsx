
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";

const OrderTable = ({ orders = [], onStatusChange }) => {
  const [statusMap, setStatusMap] = useState({});

  const handleStatusChange = (orderId, value) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handleUpdate = (orderId) => {
    const status = statusMap[orderId];

    if (!status) return;
    console.log(onStatusChange)
    if (onStatusChange) {
      onStatusChange(orderId, status);
    }

    console.log("Update Order:", orderId, status);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Orders List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Current Status</th>
              <th className="px-6 py-4">Change Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="px-6 py-4">
                    {order.user?.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.user?.email}
                  </td>

                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside text-sm">
                      {order.orderItems?.map((item) => (
                        <li key={item._id}>
                          {item.name} × {item.qty}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={order.orderStatus} />
                  </td>

                  <td className="px-6 py-4">
                    <select
                      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={
                        statusMap[order._id] || order.orderStatus
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>
                      <option value="Processing">
                        Processing
                      </option>
                      <option value="Shipped">
                        Shipped
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        handleUpdate(order._id)
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
