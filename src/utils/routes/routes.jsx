import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "../../pages/auth/signup/signup";
import Login from "../../pages/auth/login/login";

// dashboards (layout)
import AdminDashboard from "../../pages/admin/dashboard/adminDashboard/adminDashboard";
import UserDashboard from "../../pages/user/userDashboard/userDashboard/userDashboard";

// adminDashboard components
import DashboardHome from "../../pages/admin/dashboard/dashboardHome/dashboardHome";
import AdminProfile from "../../pages/admin/profile/profile";
import AllUsers from "../../pages/admin/users/allUsers/allUsers";
import AllProducts from "../../pages/admin/products/allProducts/allProducts";
import AddProducts from "../../pages/admin/products/addProduct/addProduct";
import EditProduct from "../../pages/admin/products/editProduct/editProduct";
import AdminAllOrders from "../../pages/admin/orders/adminAllOrders/adminAllOrders";
import AdminOrderDetail from "../../pages/admin/orders/adminOrderDetails/adminOrderDetails";

// userDashboard components
import UserHome from "../../pages/user/userDashboard/userHome/userHome";
import Product from "../../pages/user/userDashboard/products/products";
import ProductDetails from "../../pages/user/userDashboard/productDetails/productDetails";
import Cart from "../../pages/user/userDashboard/cart/cart";
import Checkout from "../../pages/user/userDashboard/checkout/checkout";
import MyOrders from "../../pages/user/userDashboard/orders/myOrders";

import Profile from "../../pages/user/userDashboard/profile/profile";
import OrderDetail from "../../pages/user/userDashboard/orderDetails/orderDetails";
import OrderSuccess from "../../pages/user/userDashboard/orderSuccess/orderSuccess";

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

      {/* Admin */}
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="orders" element={<AdminAllOrders />} />
          <Route path="orders/:orderId" element={<AdminOrderDetail />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/addProduct" element={<AddProducts />} />
          <Route path="products/editProduct/:productId" element={<EditProduct />} />
        </Route>
      </Route>

      {/* User */}
      <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
        <Route path="/userDashboard" element={<UserDashboard />}>
          <Route index element={<UserHome />} />
          <Route path="products" element={<Product />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orderSuccess" element={<OrderSuccess />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orderDetails/:orderId" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
