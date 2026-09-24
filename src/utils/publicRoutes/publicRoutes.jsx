import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const accessCookies = Cookies.get("myApp_login");

    if (!accessCookies) {
        return <Outlet />;
    }

    const currentUser = JSON.parse(accessCookies);

    if (currentUser.role === "admin") {
        return <Navigate to="/adminDashboard" replace />;
    }

    return <Navigate to="/userDashboard" replace />;
};

export default PublicRoutes;