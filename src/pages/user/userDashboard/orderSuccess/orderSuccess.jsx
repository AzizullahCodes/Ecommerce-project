import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const OrderSuccess = () => {
  const [lastOrder, setLastOrder] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let history = JSON.parse(localStorage.getItem('OrderHistory'))
    if (Array.isArray(history) && history.length > 0) {
      setLastOrder(history[history.length - 1]) // sabse naya order
    }
    setLoaded(true)
  }, [])

  if (!loaded) return null
  if (!lastOrder) return <Navigate to="/userDashboard" replace />

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>Order placed successfully ✅</h1>
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