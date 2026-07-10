import { Package, ShoppingCart, IndianRupee, Users } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext";
import { useOrders } from "../../contexts/OrderContext";
const Dashboard = () => {
  const { users } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();
  // console.log(orders._id)

  // orders.map((item, id) =>{
  //     console.log(item._id)
  // })
  // Dummy Data
  const totalRevenue = orders.reduce(
  (total, order) => total + order.totalPrice,
  0
);
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue,
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome to the ShopEasy Admin Panel.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Products</p>

            <h2 className="text-3xl font-bold mt-2">{stats.totalProducts}</h2>
          </div>

          <div className="bg-indigo-100 p-4 rounded-full">
            <Package className="text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Orders</p>

            <h2 className="text-3xl font-bold mt-2">{stats.totalOrders}</h2>
          </div>

          <div className="bg-green-100 p-4 rounded-full">
            <ShoppingCart className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Users</p>

            <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
          </div>

          <div className="bg-yellow-100 p-4 rounded-full">
            <Users className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Revenue</p>

            <h2 className="text-3xl font-bold mt-2 flex items-center">
              <IndianRupee size={24} />
              {stats.totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="bg-red-100 p-4 rounded-full">
            <IndianRupee className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow">
        <div className="border-b p-6">
          <h2 className="text-2xl font-semibold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">#{order._id.slice(-6)}</td>

                  <td className="p-4"> {order.user?.name}</td>

                  <td className="p-4 font-semibold">₹{order.totalPrice}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
