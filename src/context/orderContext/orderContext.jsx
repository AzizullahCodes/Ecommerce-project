import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Create order
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: "Pending",
    };

    setOrders([...orders, newOrder]);
  };

  // Cancel order
  const cancelOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  // Update order status - Admin
  const updateOrderStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: status }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        cancelOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrderContext);
};