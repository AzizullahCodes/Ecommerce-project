import { createRoot } from "react-dom/client";
import AuthProvider from "./context/authContext/authContext.jsx";
import { CartProvider } from "./context/cartContext/cartContext.jsx";
import { OrderProvider } from "./context/orderContext/orderContext.jsx";

<<<<<<< HEAD
import "./index.css";
import App from "./App.jsx";
=======
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77

createRoot(document.getElementById("root")).render(
 <AuthProvider>
      <CartProvider>
       <OrderProvider>
    <App />
  </OrderProvider>
 </CartProvider>
 </AuthProvider>
);

<<<<<<< HEAD

//we can use 
=======
 
      <App />
 
 
)
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
