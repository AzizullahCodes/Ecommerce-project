import React from "react";
import UserSidebar from "../../../../components/userSidebar/userSidebar";
import "./userDashboard.css";
import { useAuth } from "../../../../context/authContext/authContext";

const UserDashboard = () => {
    const {user} = useAuth()
    console.log(user)
  return (
    <div className="user-layout">
      <UserSidebar />

      <main className="user-main">
        <div className="dashboard-header">
          <div>
            <h1>User Dashboard</h1>
            <p>Welcome back, User</p>
          </div>

          <div className="user-profile">
            <div className="profile-avatar">U</div>

            <div>
              <strong>User Name</strong>
              <span>Customer</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div>
              <p>Total Orders</p>
              <h2>12</h2>
            </div>
            <div className="card-icon">📦</div>
          </div>

          <div className="dashboard-card">
            <div>
              <p>Wishlist Items</p>
              <h2>5</h2>
            </div>
            <div className="card-icon">❤️</div>
          </div>

          <div className="dashboard-card">
            <div>
              <p>Cart Items</p>
              <h2>3</h2>
            </div>
            <div className="card-icon">🛒</div>
          </div>

          <div className="dashboard-card">
            <div>
              <p>Reviews Given</p>
              <h2>7</h2>
            </div>
            <div className="card-icon">⭐</div>
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

export default UserDashboard;