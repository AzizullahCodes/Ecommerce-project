
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders =
      JSON.parse(localStorage.getItem("OrderHistory")) || [];

    const activeUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (Array.isArray(fetchAllOrders)) {
      const userOrders = fetchAllOrders
        .filter((order) => order.userId === activeUser?.email)
        .reverse();

      setMyOrders(userOrders);
    }
  }, []);

  // Empty orders
  if (myOrders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1 className="orders-title">My Orders</h1>

          <div className="empty-orders">
            <div className="empty-icon">📦</div>

            <h2>No Orders Yet</h2>

            <p>
              Aapne abhi tak koi order nahi kiya.
            </p>

            <button
              className="shop-now-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* Page Header */}
        <div className="orders-page-header">
          <div>
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">
              View and manage all your orders
            </p>
          </div>

          <div className="orders-count">
            {myOrders.length}{" "}
            {myOrders.length === 1 ? "Order" : "Orders"}
          </div>
        </div>

        {/* Orders */}
        <div className="orders-list">
          {myOrders.map((order) => {
            const status = (order.status || "pending").toLowerCase();

            return (
              <div className="order-card" key={order.orderId}>

                {/* Order Header */}
                <div className="order-header">

                  <div className="order-header-left">
                    <p className="order-label">Order ID</p>

                    <h2 className="order-id">
                      #{order.orderId}
                    </h2>
                  </div>

                  <div className="order-date">
                    <p className="order-label">Order Date</p>

                    <p className="order-value">
                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                    {order.orderTime && (
                      <p className="order-time">
                        {order.orderTime}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <span
                    className={`status-badge status-${status}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Main Order Summary */}
                <div className="order-summary">

                  {/* Products */}
                  <div className="summary-box">
                    <span className="summary-icon">🛍️</span>

                    <div>
                      <p className="summary-label">
                        Products
                      </p>

                      <p className="summary-value">
                        {order.bucket?.length || 0}{" "}
                        {order.bucket?.length === 1
                          ? "Item"
                          : "Items"}
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="summary-box">
                    <span className="summary-icon">💳</span>

                    <div>
                      <p className="summary-label">
                        Payment
                      </p>

                      <p className="summary-value">
                        {order.paymentMethod || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="summary-box">
                    <span className="summary-icon">🚚</span>

                    <div>
                      <p className="summary-label">
                        Delivery
                      </p>

                      <p className="summary-value">
                        {status === "delivered"
                          ? "Delivered"
                          : status === "cancelled"
                          ? "Cancelled"
                          : order.estimatedDelivery
                          ? new Date(
                              order.estimatedDelivery
                            ).toLocaleDateString()
                          : "Processing"}
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="summary-box total-box">
                    <span className="summary-icon">💰</span>

                    <div>
                      <p className="summary-label">
                        Total
                      </p>

                      <p className="summary-total">
                        {order.totalPrice || 0} PKR
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Preview */}
                {order.bucket?.length > 0 && (
                  <div className="product-preview">

                    {order.bucket.slice(0, 3).map((item) => (
                      <div
                        className="product-preview-item"
                        key={item.productId}
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                        />

                        <div>
                          <p className="product-name">
                            {item.productName}
                          </p>

                          <p className="product-quantity">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    {order.bucket.length > 3 && (
                      <div className="more-products">
                        +{order.bucket.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="order-footer">

                  <div className="footer-info">
                    {order.paymentStatus && (
                      <span>
                        Payment:{" "}
                        <strong>
                          {order.paymentStatus}
                        </strong>
                      </span>
                    )}
                  </div>

                  <button
                    className="view-details-btn"
                    onClick={() =>
                      navigate(`/userDashboard/orderDetails/${order.orderId}`)
                    }
                  >
                    View Order Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
