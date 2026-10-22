import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth/authSlice.js";
import Cookies from "js-cookie";
import { showSuccess } from "../../utils/sweetAlert.js";
import "./adminSidebar.css";

const BASE = "/adminDashboard";

const linkClass = ({ isActive }) =>
  isActive ? "admin-nav-link active" : "admin-nav-link";

const AdminSidebar = () => {
  const [productsOpen, setProductsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("myApp_login");
    await showSuccess("Logged Out", "Admin session ended.");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar-container">
      {/* Brand */}
      <div className="admin-sidebar-brand">
        <div className="admin-brand-icon">⚡</div>
        <div className="admin-brand-text">
          <h2 className="admin-brand-title">TechVault</h2>
          <span className="admin-brand-badge">ADMIN PORTAL</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar-nav">
        <div className="admin-nav-group-title">MAIN NAVIGATION</div>

        <NavLink to={BASE} end className={linkClass}>
          <span className="admin-nav-icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <div className="admin-menu-dropdown">
          <button
            className={`admin-nav-link dropdown-toggle ${productsOpen ? "open" : ""}`}
            onClick={() => setProductsOpen(!productsOpen)}
            type="button"
          >
            <span className="admin-nav-icon">🛍️</span>
            <span>Products</span>
            <span className="dropdown-arrow">{productsOpen ? "▾" : "▸"}</span>
          </button>

          {productsOpen && (
            <div className="admin-submenu">
              <NavLink to={`${BASE}/products`} end className={linkClass}>
                <span>• All Inventory</span>
              </NavLink>
              <NavLink to={`${BASE}/products/addProduct`} className={linkClass}>
                <span>• + Add Product</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to={`${BASE}/orders`} className={linkClass}>
          <span className="admin-nav-icon">📦</span>
          <span>Customer Orders</span>
        </NavLink>

        <NavLink to={`${BASE}/users`} className={linkClass}>
          <span className="admin-nav-icon">👥</span>
          <span>User Accounts</span>
        </NavLink>

        <NavLink to={`${BASE}/profile`} className={linkClass}>
          <span className="admin-nav-icon">⚙️</span>
          <span>Store Profile</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <span>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
