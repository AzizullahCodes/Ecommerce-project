import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearUser } from "../../../store/slices/auth/authSlice.js";
import { deleteUser } from "../../../store/slices/users/usersSlice.js";
import { showConfirm, showSuccess } from "../../../utils/sweetAlert.js";
import "./Profile.css";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const users = useSelector((state) => state.users.items);

  if (!user) {
    return (
      <div className="admin-profile-page">
        <div className="admin-profile-empty">
          <h2>Profile Not Found</h2>
          <p>Please log in to view your profile.</p>
          <button className="admin-profile-logout" onClick={() => navigate("/login", { replace: true })}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || "A";
  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("myApp_login", { path: "/" });
    navigate("/login", { replace: true });
  };

  // Delete account with confirmation
  const deleteAccount = async () => {
    const confirmed = await showConfirm(
      "Delete Admin Account?",
      "Are you sure you want to permanently delete your admin account? This action cannot be undone.",
      "Yes, Delete Account"
    );

    if (!confirmed) return;

    // Remove from Redux users list and clear auth state
    dispatch(deleteUser({ email: user.email, role: user.role }));
    dispatch(clearUser());
    Cookies.remove("myApp_login", { path: "/" });

    // Fallback sync with localStorage
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const jsonUsers = JSON.parse(storedUsers);
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

    await showSuccess("Account Deleted", "Your admin account has been deleted successfully.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-card">
        <div className="admin-profile-header">
          <div className="admin-profile-avatar">{initial}</div>
          <div>
            <h1>{user.name || "Admin"}</h1>
            <p>{user.email || "No email provided"}</p>
            <span className="admin-profile-role">{user.role || "Admin"}</span>
          </div>
        </div>

        <div className="admin-profile-stats">
          <div>
            <h3>{products.length}</h3>
            <p>Products</p>
          </div>
          <div>
            <h3>{orders.length}</h3>
            <p>Orders</p>
          </div>
          <div>
            <h3>{users.length}</h3>
            <p>Users</p>
          </div>
          <div>
            <h3>{revenue.toLocaleString()} PKR</h3>
            <p>Revenue</p>
          </div>
        </div>

        <div className="admin-profile-details">
          <div className="admin-profile-field">
            <span>Full Name</span>
            <p>{user.name || "Not provided"}</p>
          </div>
          <div className="admin-profile-field">
            <span>Email Address</span>
            <p>{user.email || "Not provided"}</p>
          </div>
          <div className="admin-profile-field">
            <span>Account Role</span>
            <p>{user.role || "Admin"}</p>
          </div>
          <div className="admin-profile-field">
            <span>Status</span>
            <p>Active</p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="admin-danger-card">
          <div className="admin-danger-content">
            <div className="admin-danger-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="admin-danger-text">
              <h3>Danger Zone</h3>
              <p>Permanently delete this administrator account and permissions. This action cannot be undone.</p>
            </div>
          </div>
          <button className="admin-profile-delete-btn" onClick={deleteAccount}>
            <i className="fa-solid fa-trash-can"></i> Delete Account
          </button>
        </div>

        <div className="admin-profile-actions">
          <button className="admin-profile-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
