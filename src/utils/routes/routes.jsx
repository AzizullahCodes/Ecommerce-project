// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Signup from "../../pages/auth/signup/signup";
// import Login from "../../pages/auth/login/login";

// import UserDashboard from "../../pages/user/userDashboard/userDashboard/userDashboard";
// import AdminDashboard from "../../pages/admin/dashboard/adminDashboard/adminDashboard";
// import DashboardHome from "../../pages/admin/dashboard/dashboardHome/dashboardHome"; // naya component

// // adminDashboard components
// import Coupons from "../../pages/admin/coupons/Coupons";
// import Notifications from "../../pages/admin/notifications/Notifications";
// import AllOrders from "../../pages/admin/orders/allOrders/allOrders";
// import OrderDetail from "../../pages/admin/orders/orderDetail/orderDetail";
// import AddProducts from "../../pages/admin/products/addProduct/addProduct";
// import EditProduct from "../../pages/admin/products/editProduct/editProduct";
// import Categories from "../../pages/admin/products/categories/categories";
// import AllProducts from "../../pages/admin/products/allProducts/allProducts";
// import AllReviewsPage from "../../pages/admin/reviews/allReviews";
// import AllUsers from "../../pages/admin/users/allUsers/allUsers";
// import UserDetail from "../../pages/admin/users/userDetail/userDetails";
// import Setting from "../../pages/admin/settings/Setting";
// // adminDashboard components completed

// import PublicRoutes from "../publicRoutes/publicRoutes";
// import ProtectedRoutes from "../protectedRotues/protectedRoutes";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route element={<PublicRoutes />}>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Route>

//       {/* Sirf Admin */}
//       <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
//         <Route path="/adminDashboard" element={<AdminDashboard />}>
//           {/* /adminDashboard */}
//           <Route index element={<DashboardHome />} />

//           {/* orders */}
//           <Route path="orders" element={<AllOrders />} />
//           <Route path="orders/:orderId" element={<OrderDetail />} />

//           {/* products */}
//           <Route path="products" element={<AllProducts />} />
//           <Route path="products/addProduct" element={<AddProducts />} />
//           <Route path="products/editProduct/:productId" element={<EditProduct />} />
//           <Route path="products/categories" element={<Categories />} />

//           {/* users */}
//           <Route path="users" element={<AllUsers />} />
//           <Route path="users/:userId" element={<UserDetail />} />

//           {/* baaki pages */}
//           <Route path="coupons" element={<Coupons />} />
//           <Route path="reviews" element={<AllReviewsPage />} />
//           <Route path="notifications" element={<Notifications />} />
//           <Route path="settings" element={<Setting />} />
//         </Route>
//       </Route>

//       {/* Sirf User */}
//       <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
//         <Route path="/userDashboard" element={<UserDashboard />} />
//       </Route>

//       {/* Catch All */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "../../pages/auth/signup/signup";
import Login from "../../pages/auth/login/login";

// dashboards (layout)
import AdminDashboard from "../../pages/admin/dashboard/adminDashboard/adminDashboard";
import UserDashboard from "../../pages/user/userDashboard/userDashboard/userDashboard";

// adminDashboard components
import DashboardHome from "../../pages/admin/dashboard/dashboardHome/dashboardHome";
import Coupons from "../../pages/admin/coupons/Coupons";
import Notifications from "../../pages/admin/notifications/Notifications";
import AllOrders from "../../pages/admin/orders/allOrders/allOrders";
import OrderDetail from "../../pages/admin/orders/orderDetail/orderDetail";
import AddProducts from "../../pages/admin/products/addProduct/addProduct";
import EditProduct from "../../pages/admin/products/editProduct/editProduct";
import Categories from "../../pages/admin/products/categories/categories";
import AllProducts from "../../pages/admin/products/allProducts/allProducts";
import AllReviewsPage from "../../pages/admin/reviews/allReviews";
import AllUsers from "../../pages/admin/users/allUsers/allUsers";
import UserDetail from "../../pages/admin/users/userDetail/userDetails";
import Setting from "../../pages/admin/settings/Setting";
// adminDashboard components completed

// userDashboard components
import UserHome from "../../pages/user/userDashboard/userHome/userHome";
import Product from "../../pages/user/userDashboard/products/products";
import ProductDetails from "../../pages/user/userDashboard/productDetails/productDetails";
import Cart from "../../pages/user/userDashboard/cart/cart";
import Checkout from "../../pages/user/userDashboard/checkout/checkout";
import MyOrders from "../../pages/user/userDashboard/orders/myOrders";
import OrderDetails from "../../pages/user/userDashboard/orderDetail/orderDetails";
import WishList from "../../pages/user/userDashboard/wishList/wishList";
import Reviews from "../../pages/user/userDashboard/reviews/reviews";
import Profile from "../../pages/user/userDashboard/profile/profile";
import Addresses from "../../pages/user/userDashboard/profile/addresses";
import ChangePassword from "../../pages/user/userDashboard/changePassword/changePassword";
// userDashboard components completed

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

      {/* Sirf Admin */}
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          {/* /adminDashboard */}
          <Route index element={<DashboardHome />} />

          {/* orders */}
          <Route path="orders" element={<AllOrders />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />

          {/* products */}
          <Route path="products" element={<AllProducts />} />
          <Route path="products/addProduct" element={<AddProducts />} />
          <Route path="products/editProduct/:productId" element={<EditProduct />} />
          <Route path="products/categories" element={<Categories />} />

          {/* users */}
          <Route path="users" element={<AllUsers />} />
          <Route path="users/:userId" element={<UserDetail />} />

          {/* baaki pages */}
          <Route path="coupons" element={<Coupons />} />
          <Route path="reviews" element={<AllReviewsPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Route>

      {/* Sirf User */}
      <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
        <Route path="/userDashboard" element={<UserDashboard />}>
          {/* /userDashboard */}
          <Route index element={<UserHome />} />

          {/* products */}
          <Route path="products" element={<Product />} />
          <Route path="products/:productId" element={<ProductDetails />} />

          {/* cart aur checkout */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />

          {/* orders */}
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />

          {/* baaki pages */}
          <Route path="wishlist" element={<WishList />} />
          <Route path="reviews" element={<Reviews />} />

          {/* profile */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/addresses" element={<Addresses />} />

          <Route path="changePassword" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;