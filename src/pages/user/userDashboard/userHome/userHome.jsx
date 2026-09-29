import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./userHome.css";

const BASE = "/userDashboard";

// Dummy data (baad me real data se badalna)
const stats = [
  { label: "Cart Items", value: 3, icon: "🛒", to: `${BASE}/cart` },
  { label: "My Orders", value: 12, icon: "📋", to: `${BASE}/orders` },
  { label: "Wishlist", value: 5, icon: "❤️", to: `${BASE}/wishlist` },
  { label: "Reviews", value: 4, icon: "⭐", to: `${BASE}/reviews` },
];

const featured = [
  { id: "1", name: "Running Shoes", price: 3500, icon: "👟" },
  { id: "2", name: "Smart Watch", price: 8000, icon: "⌚" },
  { id: "3", name: "Headphones", price: 4500, icon: "🎧" },
  { id: "4", name: "Backpack", price: 2500, icon: "🎒" },
];

const recentOrders = [
  { id: "101", item: "Running Shoes", status: "Delivered" },
  { id: "102", item: "Smart Watch", status: "Shipped" },
  { id: "103", item: "Backpack", status: "Processing" },
];

// Cookie se user ka naam nikalo
const getUserName = () => {
  try {
    const data = JSON.parse(Cookies.get("myApp_login"));
    return data.name || "User";
  } catch {
    return "User";
  }
};

const UserHome = () => {
  const name = getUserName();

  return (
    <div className="home">
      {/* Welcome */}
      <div className="home-welcome">
        <h1>Welcome back, {name} 👋</h1>
        <p>Aaj kya kharidna hai? Naye products dekho ya apne orders check karo.</p>
        <Link to={`${BASE}/products`} className="home-btn">
          Shop Now
        </Link>
      </div>

      {/* Stats */}
      <div className="home-stats">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="home-stat">
            <span className="home-stat-icon">{s.icon}</span>
            <div>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Products */}
      <div className="home-section">
        <div className="home-section-head">
          <h3>Featured Products</h3>
          <Link to={`${BASE}/products`}>View All</Link>
        </div>

        <div className="home-products">
          {featured.map((p) => (
            <div key={p.id} className="home-product">
              <div className="home-product-img">{p.icon}</div>
              <h4>{p.name}</h4>
              <p>Rs. {p.price}</p>
              <Link to={`${BASE}/products/${p.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="home-section">
        <div className="home-section-head">
          <h3>Recent Orders</h3>
          <Link to={`${BASE}/orders`}>View All</Link>
        </div>

        {recentOrders.map((o) => (
          <Link key={o.id} to={`${BASE}/orders/${o.id}`} className="home-order">
            <span>
              #{o.id} - {o.item}
            </span>
            <span className="home-status">{o.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserHome;