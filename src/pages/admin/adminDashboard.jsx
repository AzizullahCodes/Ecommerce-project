
import React from 'react';
import './adminDashboard.css';
import Cookies from 'js-cookie';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$24,580',
      change: '+12.5%',
      icon: '💰',
    },
    {
      title: 'Orders',
      value: '1,248',
      change: '+8.2%',
      icon: '🛒',
    },
    {
      title: 'Customers',
      value: '3,642',
      change: '+5.7%',
      icon: '👥',
    },
    {
      title: 'Products',
      value: '286',
      change: '+3.1%',
      icon: '📦',
    },
  ];

  const orders = [
    {
      id: '#ORD-1001',
      customer: 'Ali Khan',
      product: 'Wireless Headphones',
      amount: '$129.00',
      status: 'Delivered',
    },
    {
      id: '#ORD-1002',
      customer: 'Ahmed Raza',
      product: 'Smart Watch',
      amount: '$89.00',
      status: 'Processing',
    },
    {
      id: '#ORD-1003',
      customer: 'Sara Malik',
      product: 'Running Shoes',
      amount: '$75.00',
      status: 'Shipped',
    },
    {
      id: '#ORD-1004',
      customer: 'Usman Ali',
      product: 'Gaming Mouse',
      amount: '$45.00',
      status: 'Pending',
    },
    {
      id: '#ORD-1005',
      customer: 'Fatima Noor',
      product: 'Laptop Backpack',
      amount: '$59.00',
      status: 'Delivered',
    },
  ];

  const products = [
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$129',
      stock: 42,
    },
    {
      name: 'Smart Watch',
      category: 'Electronics',
      price: '$89',
      stock: 18,
    },
    {
      name: 'Running Shoes',
      category: 'Footwear',
      price: '$75',
      stock: 31,
    },
    {
      name: 'Gaming Mouse',
      category: 'Accessories',
      price: '$45',
      stock: 8,
    },
  ];
//
let accessCookies = Cookies.get('myApp_login')
console.log(`accessing cookies ${accessCookies}`)
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>🛍️</span>
          ShopAdmin
        </div>

        <nav className="admin-nav">
          <a href="#" className="active">
            <span>📊</span>
            Dashboard
          </a>

          <a href="#">
            <span>📦</span>
            Products
          </a>

          <a href="#">
            <span>🛒</span>
            Orders
          </a>

          <a href="#">
            <span>👥</span>
            Customers
          </a>

          <a href="#">
            <span>🏷️</span>
            Categories
          </a>

          <a href="#">
            <span>📈</span>
            Analytics
          </a>

          <a href="#">
            <span>⚙️</span>
            Settings
          </a>
        </nav>

        <button className="admin-logout">
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="admin-profile">
            <div className="notification">🔔</div>

            <div className="profile-avatar">
              A
            </div>

            <div className="profile-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.title}>
              <div className="stat-top">
                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span className="stat-change">
                  {stat.change}
                </span>
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          ))}
        </section>

        {/* Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Sales Overview */}
          <div className="dashboard-card sales-card">
            <div className="card-header">
              <div>
                <h2>Sales Overview</h2>
                <p>Monthly sales performance</p>
              </div>

              <select>
                <option>This Year</option>
                <option>This Month</option>
                <option>This Week</option>
              </select>
            </div>

            <div className="sales-chart">
              <div className="chart-y-axis">
                <span>$30k</span>
                <span>$20k</span>
                <span>$10k</span>
                <span>$0</span>
              </div>

              <div className="chart-area">
                <div className="chart-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="bars">
                  <div style={{ height: '45%' }}></div>
                  <div style={{ height: '65%' }}></div>
                  <div style={{ height: '52%' }}></div>
                  <div style={{ height: '78%' }}></div>
                  <div style={{ height: '60%' }}></div>
                  <div style={{ height: '88%' }}></div>
                  <div style={{ height: '72%' }}></div>
                  <div style={{ height: '94%' }}></div>
                  <div style={{ height: '76%' }}></div>
                  <div style={{ height: '84%' }}></div>
                  <div style={{ height: '90%' }}></div>
                  <div style={{ height: '98%' }}></div>
                </div>

                <div className="chart-months">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>Top Products</h2>
                <p>Best selling products</p>
              </div>

              <button className="view-btn">
                View All
              </button>
            </div>

            <div className="top-products">
              {products.map((product, index) => (
                <div className="product-row" key={product.name}>
                  <div className="product-number">
                    {index + 1}
                  </div>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                  </div>

                  <strong>{product.price}</strong>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Orders */}
        <section className="dashboard-card orders-card">

          <div className="card-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <button className="view-btn">
              View All Orders
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;

