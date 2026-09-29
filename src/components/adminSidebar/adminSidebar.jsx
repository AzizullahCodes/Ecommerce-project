// import React, { useState } from "react";

// import { NavLink } from "react-router-dom";
// import "./AdminSidebar.css";

// const AdminSidebar = () => {
//   const [productsOpen, setProductsOpen] = useState(false);

//   return (
//     <aside className="admin-sidebar">

//       <div className="sidebar-logo">
//         <h2>ShopAdmin</h2>
//       </div>

//       <nav className="sidebar-nav">

//         {/* Dashboard */}
//         <NavLink
//           to="/admin/dashboard"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>📊</span>
//           <span>Dashboard</span>
//         </NavLink>


//         {/* Products */}
//         <div className="sidebar-menu">

//           <button
//             className="sidebar-link product-menu-button"
//             onClick={() => setProductsOpen(!productsOpen)}
//           >
//             <span>📦</span>
//             <span>Products</span>
//             <span className="arrow">
//               {productsOpen ? "▲" : "▼"}
//             </span>
//           </button>

//           {productsOpen && (
//             <div className="submenu">

//               <NavLink to="/admin/products">
//                 All Products
//               </NavLink>

//               <NavLink to="/admin/products/add">
//                 Add Product
//               </NavLink>

//               <NavLink to="/admin/products/edit">
//                 Edit Product
//               </NavLink>

//               <NavLink to="/admin/products/delete">
//                 Delete Product
//               </NavLink>

//               <NavLink to="/admin/products/categories">
//                 Categories
//               </NavLink>

//             </div>
//           )}

//         </div>


//         {/* Users */}
//         <NavLink
//           to="/admin/users"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>👥</span>
//           <span>Users</span>
//         </NavLink>


//         {/* Coupons */}
//         <NavLink
//           to="/admin/coupons"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>🎟️</span>
//           <span>Coupons</span>
//         </NavLink>


//         {/* Reviews */}
//         <NavLink
//           to="/admin/reviews"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>⭐</span>
//           <span>Reviews</span>
//         </NavLink>


//         {/* Notifications */}
//         <NavLink
//           to="/admin/notifications"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>🔔</span>
//           <span>Notifications</span>
//         </NavLink>


//         {/* Settings */}
//         <NavLink
//           to="/admin/settings"
//           className={({ isActive }) =>
//             isActive ? "sidebar-link active" : "sidebar-link"
//           }
//         >
//           <span>⚙️</span>
//           <span>Settings</span>
//         </NavLink>

//       </nav>

//     </aside>
//   );
// };

// export default AdminSidebar;



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const BASE = "/adminDashboard";

const links = [
  { to: BASE, label: "Dashboard", icon: "📊", end: true },
  { to: `${BASE}/orders`, label: "Orders", icon: "🧾" },
  { to: `${BASE}/users`, label: "Users", icon: "👥" },
  { to: `${BASE}/coupons`, label: "Coupons", icon: "🎟️" },
  { to: `${BASE}/reviews`, label: "Reviews", icon: "⭐" },
  { to: `${BASE}/notifications`, label: "Notifications", icon: "🔔" },
  { to: `${BASE}/settings`, label: "Settings", icon: "⚙️" },
];

const linkClass = ({ isActive }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

const AdminSidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>ShopAdmin</h2>
      </div>

      <nav className="sidebar-nav">
        {/* Dashboard aur Orders */}
        {links.slice(0, 2).map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Products (dropdown) */}
        <div className="sidebar-menu">
          <button
            className="sidebar-link product-menu-button"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <span>📦</span>
            <span>Products</span>
            <span className="arrow">{productsOpen ? "▲" : "▼"}</span>
          </button>

          {productsOpen && (
            <div className="submenu">
              <NavLink to={`${BASE}/products`} end>All Products</NavLink>
              <NavLink to={`${BASE}/products/addProduct`}>Add Product</NavLink>
              <NavLink to={`${BASE}/products/categories`}>Categories</NavLink>
            </div>
          )}
        </div>

        {/* Baaki links */}
        {links.slice(2).map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;