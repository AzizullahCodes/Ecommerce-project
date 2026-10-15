import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from '../../../../features/orders/ordersSlice.js';
import "./adminOrderDetail.css";

const STATUS_LIST = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.items.find((o) => String(o.orderId) === String(orderId)));

  const handleStatusChange = (newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
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
          <p>Email: {order.userId || order.contactEmail || "N/A"}</p>
          <p>Phone: {order.phone || order.shippingAddress?.phone || "N/A"}</p>
          <p>Address: {order.address || order.shippingAddress?.address || "N/A"}</p>
          <p>City: {order.city || order.shippingAddress?.city || "N/A"}</p>
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
              {Number(item.productPrice || item.price || 0) * (item.quantity || 1)} PKR
            </p>
          </div>
        ))}

        <div className="aod-total">Total: {order.totalPrice || 0} PKR</div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
