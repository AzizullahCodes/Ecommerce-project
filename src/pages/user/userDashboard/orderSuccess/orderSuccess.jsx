import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './orderSuccess.css'

const OrderSuccess = () => {
  const lastOrder = useSelector((state) => state.orders.items.at(-1))

  if (!lastOrder) return <Navigate to="/userDashboard" replace />

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>Order placed successfully</h1>
        <p>Order ID: #{lastOrder.orderId}</p>
        <p>Payment: {lastOrder.paymentMethod}</p>
        <p>Total: {lastOrder.totalPrice} PKR</p>
        <p>
          Estimated Delivery:{' '}
          {new Date(lastOrder.estimatedDelivery).toDateString()}
        </p>
        <p>
          Deliver to: {lastOrder.shippingAddress.address},{' '}
          {lastOrder.shippingAddress.city}
        </p>

        <div className="success-buttons">
          <Link to="/userDashboard/orders">View My Orders</Link>
          <Link to="/userDashboard/products">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
