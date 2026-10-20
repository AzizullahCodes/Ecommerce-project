import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearUser } from "../../../../store/slices/auth/authSlice.js";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.items);
  const cartItems = useSelector((state) => state.cart.items);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Profile Not Found</h2>
          <p>Please log in to view your profile.</p>
          <button className="profile-logout-btn" onClick={() => navigate("/login", { replace: true })}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || "U";
  const myOrders = orders.filter((order) => order.userId === user.email);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("myApp_login", { path: "/" });
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <div className="profile-header-text">
            <h1>{user.name || "User"}</h1>
            <p>{user.email || "No email provided"}</p>
            <span className="profile-role-badge">{user.role || "User"}</span>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <h3>{myOrders.length}</h3>
            <p>Orders</p>
          </div>
          <div className="profile-stat">
            <h3>{cartItems.length}</h3>
            <p>Cart Items</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-title">
            <h2>Personal Information</h2>
            <span className="profile-status">Active</span>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <span className="profile-label">Full Name</span>
              <p>{user.name || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="profile-label">Email Address</span>
              <p>{user.email || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="profile-label">Account Role</span>
              <p className="profile-role">{user.role || "User"}</p>
            </div>

            <div className="profile-field">
              <span className="profile-label">Account Status</span>
              <p>Verified & Active</p>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
