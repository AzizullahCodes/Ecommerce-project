import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const BASE = "/adminDashboard";

const linkClass = ({ isActive }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

const AdminSidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>ShopAdmin</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to={BASE} end className={linkClass}>Dashboard</NavLink>
        <NavLink to={`${BASE}/profile`} className={linkClass}>Profile</NavLink>
        <NavLink to={`${BASE}/users`} className={linkClass}>Users</NavLink>
        <NavLink to={`${BASE}/orders`} className={linkClass}>Orders</NavLink>

        <div className="sidebar-menu">
          <button
            className="sidebar-link product-menu-button"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <span>Products</span>
            <span className="arrow">{productsOpen ? "▲" : "▼"}</span>
          </button>

          {productsOpen && (
            <div className="submenu">
              <NavLink to={`${BASE}/products`} end>All Products</NavLink>
              <NavLink to={`${BASE}/products/addProduct`}>Add Product</NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
