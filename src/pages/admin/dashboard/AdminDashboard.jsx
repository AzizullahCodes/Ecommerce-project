import React from "react";
import AdminSidebar from "../../../components/adminSidebar/AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>

          <div className="admin-profile">
            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>


        {/* Statistics */}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div>
              <p>Total Products</p>
              <h2>1,248</h2>
            </div>

            <div className="card-icon">
              📦
            </div>
          </div>


          <div className="dashboard-card">
            <div>
              <p>Total Users</p>
              <h2>8,540</h2>
            </div>

            <div className="card-icon">
              👥
            </div>
          </div>


          <div className="dashboard-card">
            <div>
              <p>Total Orders</p>
              <h2>3,245</h2>
            </div>

            <div className="card-icon">
              🛒
            </div>
          </div>


          <div className="dashboard-card">
            <div>
              <p>Total Revenue</p>
              <h2>$48,250</h2>
            </div>

            <div className="card-icon">
              💰
            </div>
          </div>

        </div>


        {/* Bottom Section */}

        <div className="dashboard-grid">

          <div className="dashboard-panel">
            <h3>Recent Orders</h3>

            <div className="empty-content">
              <span>📋</span>
              <p>Recent orders will appear here</p>
            </div>
          </div>


          <div className="dashboard-panel">
            <h3>Recent Reviews</h3>

            <div className="empty-content">
              <span>⭐</span>
              <p>Recent reviews will appear here</p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;