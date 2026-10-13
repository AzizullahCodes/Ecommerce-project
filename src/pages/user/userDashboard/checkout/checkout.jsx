import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './checkout.css'

const CheckOut = () => {

  const [currentOrders, setCurrentOrders] = useState([]);
  const [price, setPrice] = useState(0);
  const [nowActiveUser, setNowActiveUser] = useState(null);
  const [isPlacing, setIsPlacing] = useState(false)
  let navigate = useNavigate();

  //form data
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [address, setAddress] = useState('')
  let [city, setCity] = useState('')
  let [paymentMethod, setPaymentMethod] = useState('')
  let [otherDetails, setOtherDetails] = useState('')

  let deliveryCharges = 200
  let grandTotal = price + deliveryCharges

  //formHandler
  const formHandler = () => {
    if (isPlacing) return // double click se bachne ke liye

    // otherDetails optional hai, isliye yahan check nahi
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !paymentMethod) {
      alert('fill all required fields of form')
      return
    }

    // phone validation (11 digits, jaise 03001234567)
    if (!/^\d{11}$/.test(phone.trim())) {
      alert('phone number 11 digits ka hona chahiye')
      return
    }

    if (!nowActiveUser) {
      alert('no active user found')
      return
    }
    if (currentOrders.length === 0) {
      alert('cart is empty')
      return
    }

    setIsPlacing(true)

    // purana OrderHistory object ho sakta hai, isliye array check
    let oldHistory = JSON.parse(localStorage.getItem('OrderHistory'))
    let history = Array.isArray(oldHistory) ? oldHistory : []

    let ordersObj = {
      orderId: Date.now(),
      bucket: currentOrders,
      userId: nowActiveUser.email,
      orderDate: new Date().toISOString(),
      orderTime: new Date().toLocaleTimeString(),
      status: 'Pending',
      shippingAddress: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim()
      },
      contactEmail: email.trim(),
      paymentMethod: paymentMethod,
      paymentStatus: 'Unpaid',
      deliveryCharges: deliveryCharges,
      totalPrice: grandTotal,
      otherDetails: otherDetails.trim(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    }

    history.push(ordersObj)
    localStorage.setItem('OrderHistory', JSON.stringify(history))

    // cart clear
    localStorage.setItem('YourOrders', JSON.stringify([]))

    // replace: true => Back dabane par checkout dobara nahi khulega
    navigate('/userDashboard/orderSuccess', { replace: true })
  }

  // logged in user + cart load karo (ek hi useEffect me)
  useEffect(() => {
    let activeUser = localStorage.getItem('loggedInUser')
    if (!activeUser) {
      alert('no active user found')
      navigate('/login')
      return
    }
    setNowActiveUser(JSON.parse(activeUser))

    let orders = localStorage.getItem('YourOrders')
    let jsonOrderRecord = orders ? JSON.parse(orders) : []

    if (jsonOrderRecord.length === 0) {
      alert('cart is empty')
      navigate('/cart') // apne cart ka asli route likho
      return
    }
    setCurrentOrders(jsonOrderRecord)
  }, [])

  // total price nikalo
  useEffect(() => {
    let tot = currentOrders.reduce(
      (sum, item) => sum + Number(item.productPrice) * Number(item.quantity),
      0
    )
    setPrice(tot)
  }, [currentOrders])

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-subtitle">Apni delivery ki details bharo</p>

        {/* Contact details */}
        <h3 className="section-title">Contact Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="03001234567"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        {/* Shipping details */}
        <h3 className="section-title">Shipping Address</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Address</label>
            <input
              type="text"
              placeholder="enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label>City</label>
            <input
              type="text"
              placeholder="enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        {/* Payment */}
        <h3 className="section-title">Payment</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>Select payment method</option>
              <option value="COD">Cash on Delivery</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Easypaisa">Easypaisa</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Other Details (optional)</label>
            <input
              type="text"
              placeholder="e.g. gate ke paas dena, call before delivery"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </div>
        </div>

        {/* Order summary */}
        <h3 className="section-title">Order Summary</h3>
        <div className="summary-box">
          <div className="summary-row">
            <span>Items Total</span>
            <span>{price} PKR</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>{deliveryCharges} PKR</span>
          </div>
          <div className="summary-row summary-total">
            <span>Grand Total</span>
            <span>{grandTotal} PKR</span>
          </div>
        </div>

        <button
          className="submit-btn"
          onClick={formHandler}
          disabled={isPlacing}
        >
          {isPlacing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

export default CheckOut;