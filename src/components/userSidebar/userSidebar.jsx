import React from "react";
import { NavLink } from "react-router-dom";
import "./userSidebar.css";

const BASE = "/userDashboard";

const links = [
  { to: BASE, label: "Home", icon: "🏠", end: true },
  { to: `${BASE}/products`, label: "Products", icon: "📦" },
  { to: `${BASE}/cart`, label: "Cart", icon: "🛒" },
  { to: `${BASE}/checkout`, label: "Checkout", icon: "💳" },
  { to: `${BASE}/orders`, label: "My Orders", icon: "📋" },
  { to: `${BASE}/wishlist`, label: "Wishlist", icon: "❤️" },
  { to: `${BASE}/reviews`, label: "Reviews", icon: "⭐" },
  { to: `${BASE}/profile`, label: "Profile", icon: "👤" },
  { to: `${BASE}/changePassword`, label: "Change Password", icon: "🔒" },
];

const linkClass = ({ isActive }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

const UserSidebar = () => {
  return (
    <aside className="user-sidebar">
      <div className="sidebar-logo">
        <h2>MyShop</h2>
      </div>

      <nav className="sidebar-nav">
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;