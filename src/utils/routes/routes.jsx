import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "../../pages/auth/signup/signup";
import Login from "../../pages/auth/login/login";

// import AdminDashboard from "../../pages/admin/adminDashboard";
// import AdminDashboard from "../../pages/admin/dashboard/AdminDashboard"; 
import UserDashboard from "../../pages/user/userDashboard/userDashboard/userDashboard";
import AdminDashboard from "../../pages/admin/dashboard/adminDashboard/adminDashboard";

// import AdminDashboard from "../../pages/admin/adminDashboard";
// import UserDashboard from "../../pages/user/userDashboard/userDashboard";

import PublicRoutes from "../publicRoutes/publicRoutes";
import ProtectedRoutes from "../protectedRotues/protectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/userDashboard" element={<UserDashboard />} />
      </Route>

      {/* Catch All Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
