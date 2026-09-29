import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../../../components/adminSidebar/adminSidebar";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Page (URL) badle to mobile par sidebar band ho jaye
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="admin-layout">
      {/* Mobile par dark background, click karne se sidebar band */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar wrapper */}
      <div className={sidebarOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <AdminSidebar />
      </div>

      <main className="admin-main">
        {/* Mobile top bar (sirf mobile par dikhega) */}
        <div className="mobile-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span>ShopAdmin</span>
        </div>

        {/* Yahan current page dikhega: home, settings, orders, etc. */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;