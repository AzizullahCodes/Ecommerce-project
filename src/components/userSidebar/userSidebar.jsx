import React from "react";
import { NavLink } from "react-router-dom";
import "./userSidebar.css";

const BASE = "/userDashboard";

const links = [
  { to: BASE, label: "Home", end: true },
  { to: `${BASE}/products`, label: "Products" },
  { to: `${BASE}/cart`, label: "Cart" },
  { to: `${BASE}/checkout`, label: "Checkout" },
  { to: `${BASE}/orders`, label: "My Orders" },
  { to: `${BASE}/profile`, label: "Profile" },
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
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
