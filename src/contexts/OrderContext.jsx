import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
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
const { user } = useAuth();
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

// Place Order
const placeOrder = async (orderData) => {
  try {
    setLoading(true);

    const { data } = await api.post("/orders", orderData);

    // Add the newly created order to the state
    setOrders((prev) => [data.order, ...prev]);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to place order",
    };
  } finally {
    setLoading(false);
  }
};

  // useEffect(() => {
  //   getAllOrders();
   
  // }, []);

  const value = {
    orders,
    loading,
    getAllOrders,
    updateOrderStatus,
    placeOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;