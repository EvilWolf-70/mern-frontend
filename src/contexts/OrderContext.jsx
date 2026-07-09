import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }

  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all orders
  const getAllOrders = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/orders");

      // If your backend returns { success, orders }
      setOrders(data.orders);

      return {
        success: true,
        data: data.orders,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch orders",
      };
    } finally {
      setLoading(false);
    }
  };


  //update the status
  const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const { data } = await api.put(`/orders/${orderId}/status`, {
         orderStatus,
    });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, orderStatus }
          : order
      )
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update order",
    };
  }
};

  useEffect(() => {
    getAllOrders();
  }, []);

  const value = {
    orders,
    loading,
    getAllOrders,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;