import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React, { useEffect, useState } from 'react'
import { clearCart } from '../../../../features/cart/cartSlice.js'
import { createOrder } from '../../../../features/orders/ordersSlice.js'
import { useNavigate } from 'react-router-dom'
import './checkout.css'

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrders = useSelector((state) => state.cart.items);
  const nowActiveUser = useSelector((state) => state.auth.user);

  const [isPlacing, setIsPlacing] = useState(false)

  // form data
  const [name, setName] = useState(() => (nowActiveUser?.name ? nowActiveUser.name : ''))
  const [email, setEmail] = useState(() => (nowActiveUser?.email ? nowActiveUser.email : ''))
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [otherDetails, setOtherDetails] = useState('')
  const [errors, setErrors] = useState({})

  const deliveryCharges = 200
  const price = currentOrders.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity || 1), 0)
  const grandTotal = price + deliveryCharges

  // Pre-fill from logged-in user
  useEffect(() => {
    if (!nowActiveUser) {
      navigate('/login')
      return
    }
    if (currentOrders.length === 0) {
      navigate('/userDashboard/cart')
      return
    }
  }, [nowActiveUser, currentOrders.length, navigate])

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Full name is required'
    else if (name.trim().length < 2) e.name = 'Name is too short'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email'
    if (!phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{11}$/.test(phone.trim())) e.phone = 'Phone must be 11 digits'
    if (!address.trim()) e.address = 'Address is required'
    else if (address.trim().length < 5) e.address = 'Address is too short'
    if (!city.trim()) e.city = 'City is required'
    else if (city.trim().length < 2) e.city = 'City name is too short'
    if (!paymentMethod) e.paymentMethod = 'Please select a payment method'
    return e
  }

  const formHandler = () => {
    if (isPlacing) return
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    setIsPlacing(true)

    const ordersObj = {
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
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim()
    }

    dispatch(createOrder(ordersObj))
    dispatch(clearCart())
    navigate('/userDashboard/orderSuccess', { replace: true })
  }

  const payments = [
    { value: 'COD', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: 'fa-money-bill-wave' },
    { value: 'JazzCash', label: 'JazzCash', desc: 'Mobile wallet', icon: 'fa-mobile-screen' },
    { value: 'Easypaisa', label: 'Easypaisa', desc: 'Mobile wallet', icon: 'fa-wallet' },
  ]

  return (
    <div className="checkout-page">
      <div className="checkout-shell">
        <header className="checkout-header">
          <button type="button" className="back-link" onClick={() => navigate('/userDashboard/cart')}>
            <i className="fas fa-arrow-left"></i> Back to cart
          </button>
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Apni delivery ki details bharo aur order confirm karo</p>

          <div className="checkout-steps">
            <div className="step done"><span>1</span> Cart</div>
            <div className="step-line done"></div>
            <div className="step active"><span>2</span> Checkout</div>
            <div className="step-line"></div>
            <div className="step"><span>3</span> Confirmation</div>
          </div>
        </header>

        <div className="checkout-layout">
          {/* LEFT: Form */}
          <div className="checkout-form-col">
            {/* Contact */}
            <section className="checkout-section">
              <div className="section-head">
                <span className="section-icon contact"><i className="fas fa-user"></i></span>
                <div>
                  <h3>Contact Details</h3>
                  <p>Order confirm karne ke liye contact info</p>
                </div>
              </div>
              <div className="form-grid">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="enter name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError('name') }}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className={`form-group full-width ${errors.phone ? 'has-error' : ''}`}>
                  <label>Phone *</label>
                  <input
                    type="tel"
                    placeholder="03001234567"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); clearError('phone') }}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="checkout-section">
              <div className="section-head">
                <span className="section-icon shipping"><i className="fas fa-location-dot"></i></span>
                <div>
                  <h3>Shipping Address</h3>
                  <p>Kahan deliver karna hai</p>
                </div>
              </div>
              <div className="form-grid">
                <div className={`form-group full-width ${errors.address ? 'has-error' : ''}`}>
                  <label>Address *</label>
                  <input
                    type="text"
                    placeholder="enter full address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); clearError('address') }}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div className={`form-group full-width ${errors.city ? 'has-error' : ''}`}>
                  <label>City *</label>
                  <input
                    type="text"
                    placeholder="enter city"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); clearError('city') }}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="checkout-section">
              <div className="section-head">
                <span className="section-icon payment"><i className="fas fa-credit-card"></i></span>
                <div>
                  <h3>Payment Method</h3>
                  <p>Apna payment option choose karo</p>
                </div>
              </div>
              <div className="payment-grid">
                {payments.map((p) => (
                  <label
                    key={p.value}
                    className={`payment-card ${paymentMethod === p.value ? 'selected' : ''} ${errors.paymentMethod ? 'has-error' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={p.value}
                      checked={paymentMethod === p.value}
                      onChange={(e) => { setPaymentMethod(e.target.value); clearError('paymentMethod') }}
                    />
                    <span className="payment-icon"><i className={`fas ${p.icon}`}></i></span>
                    <span className="payment-label">{p.label}</span>
                    <span className="payment-desc">{p.desc}</span>
                    {paymentMethod === p.value && <i className="fas fa-circle-check payment-check"></i>}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <span className="field-error">{errors.paymentMethod}</span>}

              <div className="form-group full-width" style={{ marginTop: 14 }}>
                <label>Other Details (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. gate ke paas dena, call before delivery"
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                />
              </div>
            </section>
          </div>

          {/* RIGHT: Summary */}
          <aside className="checkout-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <ul className="summary-items">
                {currentOrders.map((item) => (
                  <li key={item.productId} className="summary-item">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="item-info">
                      <span className="item-name">{item.productName}</span>
                      <span className="item-qty">Qty: {item.quantity || 1}</span>
                    </div>
                    <span className="item-price">
                      {Number(item.productPrice) * Number(item.quantity || 1)} PKR
                    </span>
                  </li>
                ))}
              </ul>

              <div className="summary-totals">
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
                {isPlacing ? (
                  <><span className="btn-spinner"></span> Placing Order...</>
                ) : (
                  <><i className="fas fa-bag-shopping"></i> Place Order • {grandTotal} PKR</>
                )}
              </button>

              <p className="secure-note">
                <i className="fas fa-lock"></i> Secure checkout • Your data is safe
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CheckOut;
