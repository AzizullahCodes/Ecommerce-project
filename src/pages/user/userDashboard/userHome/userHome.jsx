import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";
import { addToCart } from "../../../../store/slices/cart/cartSlice.js";
import { selectCartCount } from "../../../../store/slices/cart/cartSelectors.js";
import { showAddedToCart, showError } from "../../../../utils/sweetAlert.js";
import { PRODUCT_CATEGORIES } from "../../../../data/defaultProducts.js";
import "./userHome.css";

const BASE = "/userDashboard";

const categoryIcons = {
  Laptops: "💻",
  Keyboards: "⌨️",
  Mouse: "🖱️",
  "Mobile Phones": "📱",
};

const UserHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();

  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const cartItems = useSelector((state) => state.cart.items);

  const name = user?.name || "Customer";
  const myOrders = orders
    .filter((order) => order.userId === user?.email)
    .slice()
    .reverse();
  const recentOrders = myOrders.slice(0, 3);
  const featuredProducts = products.slice(0, 8);

  const handleAddToCart = async (product) => {
    if (!user) {
      await showError("Login Required", "Please log in to add items to your cart.");
      return;
    }
    dispatch(addToCart(product));
    const newCount = selectCartCount(store.getState());
    const goToCart = await showAddedToCart(product.productName, newCount);
    if (goToCart) {
      navigate(`${BASE}/cart`);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="home-hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot">●</span> WELCOME {name.toUpperCase()} · MEGA ELECTRONICS SALE
          </div>
          <h1 className="hero-headline">
            Next-Gen Tech Essentials <br />
            <span>Built For Peak Performance</span>
          </h1>
          <p className="hero-subtext">
            Discover cutting-edge laptops, ergonomic accessories, mechanical keyboards
            and flagship smartphones — all with official warranty and rapid shipping.
          </p>
          <div className="hero-actions">
            <Link to={`${BASE}/products`} className="hero-primary-btn">
              <span>Explore All Products</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to={`${BASE}/cart`} className="hero-secondary-btn">
              View Cart ({cartItems.length})
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="trust-strip">
        <div className="trust-item">
          <span className="trust-icon">🚚</span>
          <div>
            <h4>Fast Nationwide Delivery</h4>
            <p>Reliable dispatch directly to your doorstep</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🛡️</span>
          <div>
            <h4>100% Genuine Tech</h4>
            <p>Official manufacturer warranty on all items</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">💳</span>
          <div>
            <h4>Cash On Delivery</h4>
            <p>Pay when you inspect your package</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🔄</span>
          <div>
            <h4>7 Days Easy Return</h4>
            <p>Guaranteed replacement & satisfaction</p>
          </div>
        </div>
      </section>

      {/* Category Browse Cards */}
      <section className="home-categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Select a category to view high-performance hardware</p>
          </div>
        </div>
        <div className="category-cards-grid">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <div
                key={cat}
                className="category-card"
                onClick={() => navigate(`${BASE}/products?category=${encodeURIComponent(cat)}`)}
              >
                <span className="cat-icon">{categoryIcons[cat] || "📦"}</span>
                <div className="cat-info">
                  <h3>{cat}</h3>
                  <span>{count} Products</span>
                </div>
                <span className="cat-link-icon">→</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Top-rated tech picks recommended by our specialists</p>
          </div>
          <Link to={`${BASE}/products`} className="view-all-link">
            View All ({products.length}) →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => {
            const id = product.productId ?? product.id;
            const priceFormatted = Number(product.productPrice).toLocaleString("en-PK");
            return (
              <div key={id} className="modern-product-card">
                <div
                  className="card-media-wrapper"
                  onClick={() => navigate(`${BASE}/products/${id}`)}
                >
                  <span className="product-category-tag">{product.category}</span>
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="product-thumbnail"
                      loading="lazy"
                    />
                  ) : (
                    <div className="product-image-fallback">
                      <span>📦</span>
                    </div>
                  )}
                </div>

                <div className="card-details">
                  <div className="rating-row">
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-score">4.9</span>
                  </div>

                  <h3
                    className="product-title"
                    onClick={() => navigate(`${BASE}/products/${id}`)}
                  >
                    {product.productName}
                  </h3>

                  <p className="product-desc">{product.productDescription}</p>

                  <div className="card-footer">
                    <div className="price-block">
                      <span className="price-label">Price</span>
                      <span className="product-price">Rs. {priceFormatted}</span>
                    </div>
                    <button
                      className="quick-add-btn"
                      onClick={() => handleAddToCart(product)}
                      title="Add to Cart"
                    >
                      <span className="cart-btn-icon">🛒</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Orders Section (if any) */}
      {recentOrders.length > 0 && (
        <section className="recent-orders-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Recent Orders</h2>
              <p className="section-subtitle">Track your recent orders and delivery status</p>
            </div>
            <Link to={`${BASE}/orders`} className="view-all-link">
              All Orders ({myOrders.length}) →
            </Link>
          </div>

          <div className="orders-summary-list">
            {recentOrders.map((order) => (
              <Link
                key={order.orderId}
                to={`${BASE}/orderDetails/${order.orderId}`}
                className="order-summary-row"
              >
                <div className="order-main-info">
                  <span className="order-id">Order #{order.orderId}</span>
                  <span className="order-items-count">
                    {order.bucket?.length || 0} item(s) • Total: Rs.{" "}
                    {Number(order.totalAmount || 0).toLocaleString("en-PK")}
                  </span>
                </div>
                <div className="order-status-badge">
                  <span className={`status-pill status-${(order.status || "Pending").toLowerCase()}`}>
                    ● {order.status || "Pending"}
                  </span>
                  <span className="order-chevron">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default UserHome;
