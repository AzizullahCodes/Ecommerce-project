import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-logo">
        <h2>ShopAdmin</h2>
      </div>

      <nav className="sidebar-nav">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>


        {/* Products */}
        <div className="sidebar-menu">

          <button
            className="sidebar-link product-menu-button"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <span>📦</span>
            <span>Products</span>
            <span className="arrow">
              {productsOpen ? "▲" : "▼"}
            </span>
          </button>

          {productsOpen && (
            <div className="submenu">

              <NavLink to="/admin/products">
                All Products
              </NavLink>

              <NavLink to="/admin/products/add">
                Add Product
              </NavLink>

              <NavLink to="/admin/products/edit">
                Edit Product
              </NavLink>

              <NavLink to="/admin/products/delete">
                Delete Product
              </NavLink>

              <NavLink to="/admin/products/categories">
                Categories
              </NavLink>

            </div>
          )}

        </div>


        {/* Users */}
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>👥</span>
          <span>Users</span>
        </NavLink>


        {/* Coupons */}
        <NavLink
          to="/admin/coupons"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>🎟️</span>
          <span>Coupons</span>
        </NavLink>


        {/* Reviews */}
        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>⭐</span>
          <span>Reviews</span>
        </NavLink>


        {/* Notifications */}
        <NavLink
          to="/admin/notifications"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>🔔</span>
          <span>Notifications</span>
        </NavLink>


        {/* Settings */}
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>⚙️</span>
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
};

export default AdminSidebar;