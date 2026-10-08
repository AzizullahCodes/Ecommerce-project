
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams(); // URL se orderId
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // timeline ke steps
  const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

  // order dhoondo
  useEffect(() => {
    let allOrders = JSON.parse(localStorage.getItem("OrderHistory"));
    let activeUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (Array.isArray(allOrders)) {
      let found = allOrders.find(
        (o) => String(o.orderId) === orderId && o.userId === activeUser?.email
      );
      setOrder(found || null);
    }
  }, [orderId]);

  // Cancel Order
  const cancelOrder = () => {
    let allOrders = JSON.parse(localStorage.getItem("OrderHistory")) || [];

    let updated = allOrders.map((o) =>
      o.orderId === order.orderId ? { ...o, status: "Cancelled" } : o
    );
    localStorage.setItem("OrderHistory", JSON.stringify(updated));

    setOrder({ ...order, status: "Cancelled" });
  };

  if (!order) {
    return (
      <div className="detail-page">
        <p className="detail-notfound">Order nahi mila.</p>
        <button className="detail-back" onClick={() => navigate("/orders")}>
          ← Back to Orders
        </button>
      </div>
    );
  }

  let status = order.status || "Pending";
  let currentStep = steps.indexOf(status);
  let itemsTotal = order.bucket.reduce(
    (sum, item) => sum + Number(item.productPrice) * Number(item.quantity),
    0
  );

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate("/orders")}>
        ← Back to Orders
      </button>

      {/* Header */}
      <div className="detail-card">
        <div className="detail-header">
          <div>
            <p className="detail-label">Order ID</p>
            <h1 className="detail-id">#{order.orderId}</h1>
            <p className="detail-date">
              {new Date(order.orderDate).toLocaleDateString()} {order.orderTime}
            </p>
          </div>
          <span className={`detail-badge badge-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>

        {/* Timeline */}
        <h3 className="detail-section">Order Status</h3>
        {status === "Cancelled" ? (
          <p className="detail-cancelled">Ye order cancel ho chuka hai.</p>
        ) : (
          <div className="timeline">
            {steps.map((step, index) => (
              <div
                key={step}
                className={
                  index <= currentStep ? "timeline-step done" : "timeline-step"
                }
              >
                <div className="timeline-circle">
                  {index <= currentStep ? "✓" : index + 1}
                </div>
                <span className="timeline-text">{step}</span>
              </div>
            ))}
          </div>
        )}

        {order.estimatedDelivery && status !== "Cancelled" && status !== "Delivered" && (
          <p className="detail-estimate">
            Estimated Delivery:{" "}
            <b>{new Date(order.estimatedDelivery).toLocaleDateString()}</b>
          </p>
        )}
      </div>

      {/* Items */}
      <div className="detail-card">
        <h3 className="detail-section">Items</h3>
        <ul className="detail-items">
          {order.bucket.map((item) => (
            <li key={item.productId} className="detail-item">
              <img
                className="detail-item-img"
                src={item.productImage}
                alt={item.productName}
              />
              <div className="detail-item-info">
                <h4>{item.productName}</h4>
                <p>
                  {item.productPrice} PKR x {item.quantity}
                </p>
              </div>
              <div className="detail-item-total">
                {item.productPrice * item.quantity} PKR
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping + Payment */}
      <div className="detail-two-col">
        <div className="detail-card">
          <h3 className="detail-section">Shipping Address</h3>
          {order.shippingAddress ? (
            <div className="detail-text">
              <p><b>{order.shippingAddress.name}</b></p>
              <p>{order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            </div>
          ) : (
            <p className="detail-text">Address save nahi hai.</p>
          )}
        </div>

        <div className="detail-card">
          <h3 className="detail-section">Payment</h3>
          <div className="detail-text">
            <p>Method: <b>{order.paymentMethod || "COD"}</b></p>
            <p>Status: <b>{order.paymentStatus || "Unpaid"}</b></p>
            {order.otherDetails && <p>Note: {order.otherDetails}</p>}
          </div>
        </div>
      </div>

      {/* Price summary */}
      <div className="detail-card">
        <h3 className="detail-section">Price Summary</h3>
        <div className="summary-row">
          <span>Items Total</span>
          <span>{itemsTotal} PKR</span>
        </div>
        <div className="summary-row">
          <span>Delivery Charges</span>
          <span>{order.deliveryCharges || 0} PKR</span>
        </div>
        <div className="summary-row summary-grand">
          <span>Grand Total</span>
          <span>{order.totalPrice} PKR</span>
        </div>
      </div>

      {/* Cancel button: sirf Pending par */}
      {status === "Pending" && (
        <button className="detail-cancel-btn" onClick={cancelOrder}>
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderDetail;