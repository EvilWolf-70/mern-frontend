// import OrderTable from "../../components/admin/OrderTable";
import { useOrders } from "../../contexts/OrderContext";
import OrderTable from "../../components/admin/OrderTable";

const Orders = () => {
  const { orders, updateOrderStatus } = useOrders();

  const handleStatusChange = async (orderId, orderStatus) => {
      const res = await updateOrderStatus(orderId, orderStatus);

  if (res.success) {
    alert("Status updated");
  } else {
    alert(res.message);
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer orders and update delivery status.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>

            <h2 className="text-3xl font-bold mt-2">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Pending</h3>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {orders.filter((order) => order.orderStatus === "Pending").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Processing</h3>

            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {orders.filter((order) => order.orderStatus === "Processing").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Delivered</h3>

            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {orders.filter((order) => order.orderStatus === "Delivered").length}
            </h2>
          </div>
        </div>

        {/* Orders Table */}
        <OrderTable
          orders={orders}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Orders;