import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addToCart } from '../../../../store/slices/cart/cartSlice.js';
import { selectCartCount } from '../../../../store/slices/cart/cartSelectors.js';
import { showAddedToCart, showError } from '../../../../utils/sweetAlert.js';
import './productDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  const product = useSelector((state) =>
    state.products.items.find((p) => String(p.productId ?? p.id) === String(productId))
  );
  const currentUser = useSelector((state) => state.auth.user);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found-card">
        <span className="not-found-icon">🔍</span>
        <h2>Product Not Found</h2>
        <p>The product you are looking for may have been removed or is temporarily unavailable.</p>
        <button
          className="btn-primary"
          onClick={() => navigate('/userDashboard/products')}
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const priceFormatted = Number(product.productPrice).toLocaleString('en-PK');
  const totalPriceFormatted = (Number(product.productPrice) * quantity).toLocaleString('en-PK');

  const handleAddToCart = async (goToCheckout = false) => {
    if (!currentUser) {
      await showError('Login Required', 'Please log in first to purchase this item.');
      return;
    }

    // Add with selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    if (goToCheckout) {
      navigate('/userDashboard/checkout');
      return;
    }

    const newCount = selectCartCount(store.getState());
    const goToCart = await showAddedToCart(product.productName, newCount);

    if (goToCart) {
      navigate('/userDashboard/cart');
    }
  };

  return (
    <div className="product-details-container">
      {/* Breadcrumb */}
      <nav className="details-breadcrumb">
        <Link to="/userDashboard">Home</Link>
        <span>/</span>
        <Link to={`/userDashboard/products?category=${encodeURIComponent(product.category || 'All')}`}>
          {product.category || 'Products'}
        </Link>
        <span>/</span>
        <span className="current-crumb">{product.productName}</span>
      </nav>

      {/* Main 2-Column Product Showcase */}
      <div className="details-main-grid">
        {/* Left: Image Showcase */}
        <div className="details-gallery-card">
          <span className="details-badge-guarantee">🛡️ Official Warranty</span>
          <div className="details-image-frame">
            {product.productImage ? (
              <img
                src={product.productImage}
                alt={product.productName}
                className="details-hero-img"
              />
            ) : (
              <div className="details-no-img">📦</div>
            )}
          </div>
          <div className="details-perks-row">
            <div className="perk-item">
              <span className="perk-icon">🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="perk-item">
              <span className="perk-icon">💳</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="perk-item">
              <span className="perk-icon">🔄</span>
              <span>7 Days Return</span>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Buy Box */}
        <div className="details-info-card">
          <div className="details-header-row">
            <span className="details-category-pill">{product.category}</span>
            <span className="details-stock-pill">● In Stock & Ready to Ship</span>
          </div>

          <h1 className="details-product-title">{product.productName}</h1>

          <div className="details-rating-block">
            <span className="details-stars">★★★★★</span>
            <span className="details-rating-val">4.9</span>
            <span className="details-reviews-count">(128 customer reviews)</span>
          </div>

          <div className="details-price-banner">
            <div className="details-price-group">
              <span className="details-price-main">Rs. {priceFormatted} PKR</span>
              <span className="details-price-old">
                Rs. {(Number(product.productPrice) * 1.15).toFixed(0)} PKR
              </span>
            </div>
            <span className="details-discount-tag">Save 15%</span>
          </div>

          <div className="details-desc-box">
            <h4>Description & Specifications:</h4>
            <p>{product.productDescription}</p>
          </div>

          {/* Quantity Stepper */}
          <div className="details-quantity-section">
            <span className="qty-label">Quantity:</span>
            <div className="qty-stepper">
              <button
                className="qty-btn"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <span className="qty-subtotal">Subtotal: Rs. {totalPriceFormatted}</span>
          </div>

          {/* CTA Actions */}
          <div className="details-actions-row">
            <button
              className="details-add-cart-btn"
              onClick={() => handleAddToCart(false)}
            >
              <span>🛒 Add to Cart</span>
            </button>
            <button
              className="details-buy-now-btn"
              onClick={() => handleAddToCart(true)}
            >
              <span>⚡ Buy Now</span>
            </button>
          </div>

          <button
            className="details-back-link"
            onClick={() => navigate('/userDashboard/products')}
          >
            ← Back to All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
