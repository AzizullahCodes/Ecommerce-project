import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/slices/cart/cartSelectors.js";
import "./userSidebar.css";

const BASE = "/userDashboard";

const linkClass = ({ isActive }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

const UserSidebar = () => {
  // Cart me kitne items hain — badge me dikhate hain
  const cartCount = useSelector(selectCartCount);

  const links = [
    { to: BASE, label: "Home", end: true },
    { to: `${BASE}/products`, label: "Products" },
    { to: `${BASE}/cart`, label: "Cart", badge: cartCount },
    { to: `${BASE}/checkout`, label: "Checkout" },
    { to: `${BASE}/orders`, label: "My Orders" },
    { to: `${BASE}/profile`, label: "Profile" },
  ];

  return (
    <aside className="user-sidebar">
      <div className="sidebar-logo">
        <h2>MyShop</h2>
      </div>

      <nav className="sidebar-nav">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
          >
            {/* Label ko container bana diya taake badge text ke upar rahe */}
            <span className="sidebar-link-label">
              {item.label}

              {/* Cart badge */}
              {item.badge > 0 && (
                <span className="cart-badge">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
