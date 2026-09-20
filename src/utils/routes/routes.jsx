import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../../pages/auth/signup';
import Login from '../../pages/auth/login';
import AdminDashboard from '../../pages/admin/adminDashboard';
import UserDashboard from '../../pages/user/userDashboard';
import CookieGuard from '../../pages/guards/cookiesGuards';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/userDashboard"
        element={
          <CookieGuard role="user">
            <UserDashboard />
          </CookieGuard>
        }
      />
      <Route
        path="/adminDashboard"
        element={
          <CookieGuard role="admin">
            <AdminDashboard />
          </CookieGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;