import { useDispatch, useSelector } from "../../../context/AppContext.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearUser } from "../../../features/auth/authSlice";
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
            <h3>{revenue} PKR</h3>
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

        <div className="admin-profile-actions">
          <button className="admin-profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
