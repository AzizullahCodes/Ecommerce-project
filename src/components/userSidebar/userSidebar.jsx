import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../store/slices/cart/cartSelectors.js";
import { logout } from "../../store/slices/auth/authSlice.js";
import Cookies from "js-cookie";
import { showSuccess } from "../../utils/sweetAlert.js";
import "./userSidebar.css";

const BASE = "/userDashboard";

const linkClass = ({ isActive }) =>
  isActive ? "user-sidebar-link active" : "user-sidebar-link";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const user = useSelector((state) => state.auth.user);

  const links = [
    { to: BASE, label: "Storefront", icon: "🏪", end: true },
    { to: `${BASE}/products`, label: "Explore Products", icon: "⚡" },
    { to: `${BASE}/cart`, label: "Shopping Cart", icon: "🛒", badge: cartCount },
    { to: `${BASE}/orders`, label: "My Orders", icon: "📦" },
    { to: `${BASE}/checkout`, label: "Checkout", icon: "💳" },
    { to: `${BASE}/profile`, label: "Account Profile", icon: "👤" },
  ];

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("myApp_login");
    await showSuccess("Logged Out", "You have safely signed out.");
    navigate("/login");
  };

  return (
    <aside className="user-sidebar-container">
      {/* Brand Header */}
      <div className="user-sidebar-brand">
        <div className="brand-icon-wrapper">
          <span>⚡</span>
        </div>
        <div className="brand-text-wrapper">
          <h2 className="brand-title">TechVault</h2>
          <span className="brand-tagline">PREMIUM STORE</span>
        </div>
      </div>

      {/* User Quick Info */}
      <div className="user-sidebar-profile">
        <div className="profile-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="profile-info">
          <p className="profile-name">{user?.name || "Customer"}</p>
          <span className="profile-status">● Active Member</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="user-sidebar-nav">
        <div className="nav-group-label">SHOPPING MENU</div>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-text">{item.label}</span>
            {item.badge > 0 && (
              <span className="nav-cart-badge">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="user-sidebar-footer">
        <button className="user-logout-button" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
