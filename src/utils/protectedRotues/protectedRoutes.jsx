import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const accessCookies = Cookies.get("myApp_login");

  if (!accessCookies) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(accessCookies);

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const home = currentUser.role === "admin" ? "/adminDashboard" : "/userDashboard";
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
