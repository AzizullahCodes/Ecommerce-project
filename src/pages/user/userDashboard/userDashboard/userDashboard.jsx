import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserSidebar from "../../../../components/userSidebar/userSidebar"; // apne path ke hisaab se
import "./userDashboard.css";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Page (URL) badle to mobile par sidebar band ho jaye
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="user-layout">
      {/* Mobile par dark background, click karne se sidebar band */}
      {sidebarOpen && (
        <div
          className="user-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar wrapper */}
      <div
        className={
          sidebarOpen ? "user-sidebar-wrapper open" : "user-sidebar-wrapper"
        }
      >
        <button
          className="user-sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <UserSidebar />
      </div>

      <main className="user-main">
        {/* Mobile top bar (sirf mobile par dikhega) */}
        <div className="user-mobile-topbar">
          <button className="user-menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span>MyShop</span>
        </div>

        {/* Yahan current page dikhega: products, cart, profile, etc. */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;