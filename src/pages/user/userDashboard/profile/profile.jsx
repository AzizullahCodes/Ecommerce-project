import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearUser } from "../../../../store/slices/auth/authSlice.js";
import { deleteUser } from "../../../../store/slices/users/usersSlice.js";
import { showConfirm, showSuccess } from "../../../../utils/sweetAlert.js";
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

  // Delete account with confirmation
  const deleteAccount = async () => {
    const confirmed = await showConfirm(
      "Delete Account?",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      "Yes, Delete Account"
    );

    if (!confirmed) return;

    // Remove from Redux users list and clear auth state
    dispatch(deleteUser({ email: user.email, role: user.role }));
    dispatch(clearUser());
    Cookies.remove("myApp_login", { path: "/" });

    // Fallback sync with localStorage
    try {
      const users = localStorage.getItem("users");
      if (users) {
        const jsonUsers = JSON.parse(users);
        const requiredIndex = jsonUsers.findIndex(
          (item) => item.email === user.email && item.role === user.role
        );
        if (requiredIndex !== -1) {
          jsonUsers.splice(requiredIndex, 1);
          localStorage.setItem("users", JSON.stringify(jsonUsers));
        }
      }
    } catch (err) {
      console.error("Error updating users in localStorage:", err);
    }

    await showSuccess("Account Deleted", "Your account has been deleted successfully.");
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

        {/* Danger Zone */}
        <div className="profile-card profile-danger-card">
          <div className="profile-danger-content">
            <div className="profile-danger-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="profile-danger-text">
              <h3>Delete Account</h3>
              <p>Permanently remove your account and all associated access. This action cannot be undone.</p>
            </div>
          </div>
          <button className="profile-delete-btn" onClick={deleteAccount}>
            <i className="fa-solid fa-trash-can"></i> Delete Account
          </button>
        </div>

        <div className="profile-actions">
          <button className="profile-logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
