import React from "react";
import { NavLink } from "react-router-dom";
import "./userSidebar.css";

const UserSidebar = () => {
  return (
    <aside className="user-sidebar">
      <div className="sidebar-logo">
        <h2>MyShop</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/user/products"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          📦 Products
        </NavLink>

        <NavLink
          to="/user/productdetail"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          🔍 Product Detail
        </NavLink>

        <NavLink
          to="/user/cart"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          🛒 Cart
        </NavLink>

        <NavLink
          to="/user/checkout"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          💳 Checkout
        </NavLink>

        <NavLink
          to="/user/orderdetails"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          📋 Order Details
        </NavLink>

        <NavLink
          to="/user/wishlist"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          ❤️ Wishlist
        </NavLink>

        <NavLink
          to="/user/reviews"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          ⭐ Reviews
        </NavLink>

        <NavLink
          to="/user/changepassword"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          🔒 Change Password
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;