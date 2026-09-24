import { createRoot } from "react-dom/client";
import AuthProvider from "./context/authContext/authContext.jsx";
import { CartProvider } from "./context/cartContext/cartContext.jsx";
import { OrderProvider } from "./context/orderContext/orderContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
 <AuthProvider>
      <CartProvider>
       <OrderProvider>
    <App />
  </OrderProvider>
 </CartProvider>
 </AuthProvider>
);


//we can use 