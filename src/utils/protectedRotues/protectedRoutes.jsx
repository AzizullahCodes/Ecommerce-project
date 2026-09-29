// import React from "react";
// import Cookies from "js-cookie";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const accessCookies = Cookies.get("myApp_login");
//   const location = useLocation();

//   // User logged in nahi hai
//   if (!accessCookies) {
//     return <Navigate to="/login" replace />;
//   }

//   const currentUser = JSON.parse(accessCookies);

//   // Admin sirf adminDashboard access kar sakta hai
//   if (location.pathname === "/adminDashboard" && currentUser.role !== "admin") {
//     return <Navigate to="/userDashboard" replace />;
//   }

//   // User sirf userDashboard access kar sakta hai
//   if (location.pathname === "/userDashboard" && currentUser.role !== "user") {
//     return <Navigate to="/adminDashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoutes;



import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const accessCookies = Cookies.get("myApp_login");

  // User logged in nahi hai
  if (!accessCookies) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(accessCookies);

  // Role allowed nahi hai to apne dashboard par bhejo
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const home = currentUser.role === "admin" ? "/adminDashboard" : "/userDashboard";
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;