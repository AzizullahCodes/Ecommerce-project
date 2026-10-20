import { useSelector } from 'react-redux';
import React from "react";
import { Link } from "react-router-dom";
import "./userHome.css";

const BASE = "/userDashboard";

const UserHome = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const cartItems = useSelector((state) => state.cart.items);

  const name = user?.name || "User";
  const myOrders = orders
    .filter((order) => order.userId === user?.email)
    .slice()
    .reverse();
  const recentOrders = myOrders.slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  const stats = [
    { label: "Cart Items", value: cartItems.length, to: `${BASE}/cart` },
    { label: "My Orders", value: myOrders.length, to: `${BASE}/orders` },
    { label: "Products", value: products.length, to: `${BASE}/products` },
  ];

  return (
    <div className="home">
      <div className="home-welcome">
        <h1>Welcome back, {name}</h1>
        <p>Explore new products or check your orders.</p>
        <Link to={`${BASE}/products`} className="home-btn">
          Shop Now
        </Link>
      </div>

      <div className="home-stats">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="home-stat">
            <span className="home-stat-icon">📦</span>
            <div>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="home-section">
        <div className="home-section-head">
          <h3>Featured Products</h3>
          <Link to={`${BASE}/products`}>View All</Link>
        </div>

        <div className="home-products">
          {featuredProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            featuredProducts.map((product) => (
              <div key={product.productId ?? product.id} className="home-product">
                <h4>{product.productName}</h4>
                <p>Rs. {product.productPrice}</p>
                <Link to={`${BASE}/products/${product.productId ?? product.id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="home-section">
        <div className="home-section-head">
          <h3>Recent Orders</h3>
          <Link to={`${BASE}/orders`}>View All</Link>
        </div>

        {recentOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          recentOrders.map((order) => (
            <Link key={order.orderId} to={`${BASE}/orderDetails/${order.orderId}`} className="home-order">
              <span>#{order.orderId} - {order.bucket?.length || 0} item(s)</span>
              <span className="home-status">{order.status || "Pending"}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default UserHome;
