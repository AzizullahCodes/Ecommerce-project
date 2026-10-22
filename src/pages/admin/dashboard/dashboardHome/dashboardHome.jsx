import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './dashboardHome.css';

const DashboardHome = () => {
  const products = useSelector((state) => state.products.items);
  const users = useSelector((state) => state.users.items);
  const orders = useSelector((state) => state.orders.items);

  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPrice || order.totalAmount || 0), 0);
  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="admin-page-title">Executive Dashboard</h1>
          <p className="admin-page-subtitle">Real-time performance metrics and store management</p>
        </div>
        <div className="dashboard-header-actions">
          <Link to="/adminDashboard/products/addProduct" className="admin-quick-add">
            + Add Product
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box kpi-products">🛍️</div>
          <div className="kpi-info">
            <span className="kpi-label">Total Catalog Products</span>
            <h2 className="kpi-value">{products.length}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-revenue">💰</div>
          <div className="kpi-info">
            <span className="kpi-label">Total Store Revenue</span>
            <h2 className="kpi-value">Rs. {revenue.toLocaleString('en-PK')}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-orders">📦</div>
          <div className="kpi-info">
            <span className="kpi-label">Total Customer Orders</span>
            <h2 className="kpi-value">{orders.length}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-users">👥</div>
          <div className="kpi-info">
            <span className="kpi-label">Registered Users</span>
            <h2 className="kpi-value">{users.length}</h2>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="dashboard-section-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Recent Customer Orders</h3>
            <p className="card-subtitle">Latest orders placed across the store</p>
          </div>
          <Link to="/adminDashboard/orders" className="view-more-link">
            View All Orders ({orders.length}) →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="orders-empty-box">
            <span>📦</span>
            <p>No customer orders placed yet.</p>
          </div>
        ) : (
          <div className="recent-orders-table">
            <div className="table-head">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Total Amount</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {recentOrders.map((order) => {
              const id = order.orderId ?? order.id;
              const total = Number(order.totalPrice || order.totalAmount || 0).toLocaleString('en-PK');
              const statusClass = (order.status || 'Pending').toLowerCase();
              return (
                <div key={id} className="table-row">
                  <span className="row-order-id">#{id}</span>
                  <span className="row-customer">
                    {order.customerName || order.shippingAddress?.name || order.userId || 'Customer'}
                  </span>
                  <span className="row-items">{order.bucket?.length || 1} item(s)</span>
                  <span className="row-total">Rs. {total}</span>
                  <span>
                    <span className={`status-pill status-${statusClass}`}>
                      ● {order.status || 'Pending'}
                    </span>
                  </span>
                  <Link to={`/adminDashboard/orders/${id}`} className="row-action-link">
                    Manage →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
