import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { changeQuantity, setQuantity, removeFromCart, clearCart } from '../../../../store/slices/cart/cartSlice.js';
import './cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrders = useSelector((state) => state.cart.items);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = currentOrders.reduce(
    (sum, item) => sum + Number(item.productPrice) * Number(item.quantity || 1),
    0
  );

  const shippingCharges = subtotal > 5000 || subtotal === 0 ? 0 : 200;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal + shippingCharges - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TECH10') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try TECH10 for 10% off!');
    }
  };

  return (
    <div className="cart-container">
      {/* Page Header */}
      <div className="cart-header">
        <div>
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            {currentOrders.length} unique item{currentOrders.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        {currentOrders.length > 0 && (
          <button
            className="cart-clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        )}
      </div>

      {currentOrders.length > 0 ? (
        <div className="cart-layout-grid">
          {/* Left: Cart Items List */}
          <div className="cart-items-wrapper">
            <div className="cart-items-card">
              <div className="cart-table-head">
                <span className="col-product">Product</span>
                <span className="col-price">Unit Price</span>
                <span className="col-qty">Quantity</span>
                <span className="col-total">Subtotal</span>
                <span className="col-action"></span>
              </div>

              <div className="cart-items-list">
                {currentOrders.map((product) => {
                  const id = product.productId ?? product.id;
                  const itemQty = Number(product.quantity || 1);
                  const itemPrice = Number(product.productPrice);
                  const itemSubtotal = itemPrice * itemQty;

                  return (
                    <div key={id} className="cart-item-row">
                      {/* Product Thumbnail & Title */}
                      <div className="col-product item-info-cell">
                        <Link
                          to={`/userDashboard/products/${id}`}
                          className="item-thumb-link"
                        >
                          {product.productImage ? (
                            <img
                              src={product.productImage}
                              alt={product.productName}
                              className="item-thumb"
                            />
                          ) : (
                            <div className="item-thumb-fallback">📦</div>
                          )}
                        </Link>
                        <div className="item-text-info">
                          <span className="item-category-tag">{product.category}</span>
                          <Link
                            to={`/userDashboard/products/${id}`}
                            className="item-name"
                          >
                            {product.productName}
                          </Link>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-price">
                        <span className="mobile-label">Price:</span>
                        <span className="cell-price">
                          Rs. {itemPrice.toLocaleString('en-PK')}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-qty">
                        <div className="cart-stepper">
                          <button
                            className="stepper-btn"
                            onClick={() =>
                              dispatch(changeQuantity({ id, amount: -1 }))
                            }
                            disabled={itemQty <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={itemQty}
                            onChange={(e) =>
                              dispatch(
                                setQuantity({
                                  id,
                                  quantity: Math.max(1, parseInt(e.target.value) || 1),
                                })
                              )
                            }
                            className="stepper-input"
                          />
                          <button
                            className="stepper-btn"
                            onClick={() =>
                              dispatch(changeQuantity({ id, amount: 1 }))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Item Subtotal */}
                      <div className="col-total">
                        <span className="mobile-label">Total:</span>
                        <span className="cell-subtotal">
                          Rs. {itemSubtotal.toLocaleString('en-PK')}
                        </span>
                      </div>

                      {/* Remove Action */}
                      <div className="col-action">
                        <button
                          className="item-remove-btn"
                          onClick={() => dispatch(removeFromCart(id))}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-card-footer">
                <Link to="/userDashboard/products" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="cart-summary-wrapper">
            <div className="cart-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString('en-PK')}</span>
                </div>

                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span className={shippingCharges === 0 ? 'free-shipping-text' : ''}>
                    {shippingCharges === 0 ? 'FREE' : `Rs. ${shippingCharges}`}
                  </span>
                </div>

                {promoApplied && (
                  <div className="summary-row discount-row">
                    <span>Promo Discount (10%)</span>
                    <span>- Rs. {discount.toLocaleString('en-PK')}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row grand-total-row">
                  <span>Grand Total</span>
                  <span className="grand-total-amount">
                    Rs. {grandTotal.toLocaleString('en-PK')} PKR
                  </span>
                </div>
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="promo-form">
                <input
                  type="text"
                  placeholder="Promo Code (try TECH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="promo-apply-btn">
                  Apply
                </button>
              </form>

              {/* Checkout CTA */}
              <button
                className="checkout-proceed-btn"
                onClick={() => navigate('/userDashboard/checkout')}
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>

              <div className="checkout-trust-badge">
                <span>🔒</span>
                <span>Guaranteed Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="cart-empty-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your shopping cart is empty</h2>
          <p>Explore our premium tech catalog to find your next setup upgrade.</p>
          <Link to="/userDashboard/products" className="start-shopping-btn">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
