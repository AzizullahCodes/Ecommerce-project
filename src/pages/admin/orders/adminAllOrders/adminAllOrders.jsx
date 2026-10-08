import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminAllOrders.css";

const STATUS_LIST = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("OrderHistory")) || [];
    setOrders(Array.isArray(data) ? [...data].reverse() : []);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const all = JSON.parse(localStorage.getItem("OrderHistory")) || [];

    const updated = all.map((o) => {
      if (o.orderId !== orderId) return o;
      return {
        ...o,
        status: newStatus,
        paymentStatus: newStatus === "delivered" ? "Paid" : o.paymentStatus,
      };
    });

    localStorage.setItem("OrderHistory", JSON.stringify(updated));
    setOrders([...updated].reverse());
  };

  const filteredOrders = orders.filter((order) => {
    const status = (order.status || "pending").toLowerCase();
    const text = search.toLowerCase();

    const matchSearch =
      String(order.orderId).toLowerCase().includes(text) ||
      (order.userId || "").toLowerCase().includes(text) ||
      (order.customerName || "").toLowerCase().includes(text);

    const matchStatus = statusFilter === "all" || status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <div>
          <h1>All Orders</h1>
          <p>Total: {orders.length} orders</p>
        </div>

        <div className="admin-orders-controls">
          <input
            type="text"
            placeholder="Search by order ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="admin-orders-empty">Koi order nahi mila.</div>
      ) : (
        <div className="admin-orders-table-wrap">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => {
                const status = (order.status || "pending").toLowerCase();
                const locked = status === "cancelled" || status === "delivered";

                return (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{order.customerName || order.userId || "N/A"}</td>
                    <td>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{order.bucket?.length || 0}</td>
                    <td>
                      {order.paymentMethod || "N/A"}
                      <br />
                      <small>{order.paymentStatus || ""}</small>
                    </td>
                    <td>{order.totalPrice || 0} PKR</td>
                    <td>
                      <select
                        className={`admin-status status-${status}`}
                        value={status}
                        disabled={locked}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
                        {STATUS_LIST.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="admin-view-btn"
                        onClick={() =>
                          navigate(`/adminDashboard/orders/${order.orderId}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllOrders;