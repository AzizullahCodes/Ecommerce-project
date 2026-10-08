import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./adminOrderDetail.css";

const STATUS_LIST = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("OrderHistory")) || [];
    const found = all.find((o) => String(o.orderId) === String(orderId));
    setOrder(found || null);
  }, [orderId]);

  const handleStatusChange = (newStatus) => {
    const all = JSON.parse(localStorage.getItem("OrderHistory")) || [];

    const updated = all.map((o) =>
      String(o.orderId) === String(orderId)
        ? {
            ...o,
            status: newStatus,
            paymentStatus: newStatus === "delivered" ? "Paid" : o.paymentStatus,
          }
        : o
    );

    localStorage.setItem("OrderHistory", JSON.stringify(updated));
    setOrder(updated.find((o) => String(o.orderId) === String(orderId)));
  };

  if (!order) {
    return (
      <div className="aod-page">
        <h2>Order not found</h2>
        <button className="aod-back" onClick={() => navigate("/adminDashboard/orders")}>
          ← Back to Orders
        </button>
      </div>
    );
  }

  const status = (order.status || "pending").toLowerCase();
  const locked = status === "cancelled" || status === "delivered";

  return (
    <div className="aod-page">
      <button className="aod-back" onClick={() => navigate("/adminDashboard/orders")}>
        ← Back to Orders
      </button>

      <div className="aod-header">
        <h1>Order #{order.orderId}</h1>

        <select
          className={`admin-status status-${status}`}
          value={status}
          disabled={locked}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="aod-grid">
        <div className="aod-card">
          <h3>Customer</h3>
          <p>Name: {order.customerName || "N/A"}</p>
          <p>Email: {order.userId || "N/A"}</p>
          <p>Phone: {order.phone || "N/A"}</p>
          <p>Address: {order.address || "N/A"}</p>
        </div>

        <div className="aod-card">
          <h3>Order Info</h3>
          <p>
            Date:{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleDateString()
              : "N/A"}{" "}
            {order.orderTime || ""}
          </p>
          <p>Payment: {order.paymentMethod || "N/A"}</p>
          <p>Payment Status: {order.paymentStatus || "N/A"}</p>
          <p>
            Est. Delivery:{" "}
            {order.estimatedDelivery
              ? new Date(order.estimatedDelivery).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="aod-card">
        <h3>Products</h3>

        {order.bucket?.map((item) => (
          <div className="aod-item" key={item.productId}>
            <img src={item.productImage} alt={item.productName} />
            <div className="aod-item-info">
              <p className="aod-item-name">{item.productName}</p>
              <p>Qty: {item.quantity}</p>
            </div>
            <p className="aod-item-price">
              {(item.price || 0) * (item.quantity || 1)} PKR
            </p>
          </div>
        ))}

        <div className="aod-total">Total: {order.totalPrice || 0} PKR</div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;