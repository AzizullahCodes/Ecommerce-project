
import React from 'react';
import { Link } from 'react-router-dom';
import './userDashboard.css';

const UserDashboard = () => {
  const orders = [
    {
      id: '#ORD-1001',
      product: 'Wireless Headphones',
      date: '22 Sep 2026',
      amount: '$129.00',
      status: 'Delivered',
    },
    {
      id: '#ORD-1002',
      product: 'Smart Watch',
      date: '18 Sep 2026',
      amount: '$89.00',
      status: 'Processing',
    },
    {
      id: '#ORD-1003',
      product: 'Running Shoes',
      date: '12 Sep 2026',
      amount: '$75.00',
      status: 'Shipped',
    },
  ];

  return (
    <div className="user-dashboard">

      {/* Header */}
      <header className="user-header">

        <div className="user-logo">
          🛍️ MyShop
        </div>

        <nav className="user-nav">
          <Link to="/userDashboard" className="active">
            Dashboard
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/cart">
            Cart
          </Link>
        </nav>

        <div className="user-header-right">
          <button className="header-icon">
            🛒
          </button>

          <div className="user-avatar">
            A
          </div>
        </div>

      </header>

      {/* Main */}
      <main className="user-main">

        {/* Welcome */}
        <section className="welcome-section">
          <div>
            <h1>Welcome back, Ali! 👋</h1>
            <p>
              Manage your account, orders and shopping activity.
            </p>
          </div>

          <Link to="/products" className="shop-btn">
            Continue Shopping
          </Link>
        </section>

        {/* Stats */}
        <section className="user-stats">

          <div className="user-stat-card">
            <div className="user-stat-icon">
              📦
            </div>

            <div>
              <span>Total Orders</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-icon">
              ❤️
            </div>

            <div>
              <span>Wishlist</span>
              <strong>8</strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-icon">
              🛒
            </div>

            <div>
              <span>Cart Items</span>
              <strong>3</strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-icon">
              🎁
            </div>

            <div>
              <span>Rewards</span>
              <strong>450</strong>
            </div>
          </div>

        </section>

        {/* Content Grid */}
        <section className="user-content-grid">

          {/* Recent Orders */}
          <div className="user-card orders-section">

            <div className="user-card-header">
              <div>
                <h2>Recent Orders</h2>
                <p>Your latest purchases</p>
              </div>

              <Link to="/orders">
                View All
              </Link>
            </div>

            <div className="user-orders">

              {orders.map((order) => (
                <div className="user-order" key={order.id}>

                  <div className="order-image">
                    📦
                  </div>

                  <div className="order-info">
                    <strong>{order.product}</strong>
                    <span>{order.id}</span>
                    <small>{order.date}</small>
                  </div>

                  <div className="order-right">
                    <strong>{order.amount}</strong>

                    <span
                      className={`user-order-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Profile */}
          <div className="user-card profile-section">

            <div className="user-card-header">
              <div>
                <h2>My Profile</h2>
                <p>Your account information</p>
              </div>

              <button className="edit-btn">
                Edit
              </button>
            </div>

            <div className="profile-large-avatar">
              A
            </div>

            <div className="profile-details">

              <div>
                <span>Name</span>
                <strong>Ali Khan</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>ali@example.com</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>+92 300 1234567</strong>
              </div>

            </div>

          </div>

        </section>

        {/* Quick Actions */}
        <section className="user-card quick-actions">

          <div className="user-card-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Frequently used options</p>
            </div>
          </div>

          <div className="quick-action-grid">

            <Link to="/products" className="quick-action">
              <span>🛍️</span>
              <strong>Shop Products</strong>
              <small>Browse our products</small>
            </Link>

            <Link to="/orders" className="quick-action">
              <span>📦</span>
              <strong>My Orders</strong>
              <small>Track your orders</small>
            </Link>

            <Link to="/wishlist" className="quick-action">
              <span>❤️</span>
              <strong>Wishlist</strong>
              <small>View saved products</small>
            </Link>

            <Link to="/cart" className="quick-action">
              <span>🛒</span>
              <strong>My Cart</strong>
              <small>View cart items</small>
            </Link>

          </div>

        </section>

        {/* Recommended */}
        <section className="user-card">

          <div className="user-card-header">
            <div>
              <h2>Recommended For You</h2>
              <p>Products you may like</p>
            </div>

            <Link to="/products">
              View All
            </Link>
          </div>

          <div className="recommended-grid">

            <div className="recommended-product">
              <div className="recommended-image">
                🎧
              </div>

              <div>
                <strong>Wireless Headphones</strong>
                <span>Electronics</span>
                <b>$129</b>
              </div>
            </div>

            <div className="recommended-product">
              <div className="recommended-image">
                ⌚
              </div>

              <div>
                <strong>Smart Watch</strong>
                <span>Electronics</span>
                <b>$89</b>
              </div>
            </div>

            <div className="recommended-product">
              <div className="recommended-image">
                👟
              </div>

              <div>
                <strong>Running Shoes</strong>
                <span>Footwear</span>
                <b>$75</b>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="user-footer">
        <p>© 2026 MyShop. All rights reserved.</p>

        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>

    </div>
  );
};

export default UserDashboard;

