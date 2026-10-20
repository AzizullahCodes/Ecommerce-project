import React from "react";
import { useSelector } from 'react-redux';
import './dashboardHome.css';

const DashboardHome = () => {
  const products = useSelector((state) => state.products.items);
  const users = useSelector((state) => state.users.items);
  const orders = useSelector((state) => state.orders.items);

  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of your store</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div>
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div>
            <p>Total Revenue</p>
            <h2>{revenue} PKR</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {recentOrders.map((order) => (
              <li key={order.orderId ?? order.id}>
                #{order.orderId ?? order.id} - {order.customerName || order.userId || "N/A"} - {order.totalPrice || 0} PKR - {order.status || "Pending"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
