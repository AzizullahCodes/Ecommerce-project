import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { addProduct } from '../../../../store/slices/products/productsSlice.js';
import { showError, showSuccess } from '../../../../utils/sweetAlert.js';
import { PRODUCT_CATEGORIES } from '../../../../data/defaultProducts.js';
import { Link } from 'react-router-dom';
import './addProduct.css';

const AddProducts = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products.items);

  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');

  // addProductsHandler
  const addProductsHandler = async (e) => {
    e?.preventDefault?.();

    if (!productName.trim() || !productPrice.trim()) {
      await showError('Missing details', 'Product name and price are required');
      return;
    }
    if (productName.trim().length < 2) {
      await showError('Invalid name', 'Product name must be at least 2 characters');
      return;
    }
    if (isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
      await showError('Invalid price', 'Product price must be a positive number');
      return;
    }
    if (!productCategory) {
      await showError('Category Required', 'Please select a product category before adding');
      return;
    }

    let obj = {
      productId: Date.now().toString(),
      productName: productName.trim(),
      productImage: productImage.trim(),
      productDescription: productDescription.trim(),
      productPrice: productPrice.trim(),
      quantity: 1,
      category: productCategory,
    };

    dispatch(addProduct(obj));

    // clear states
    setProductName('');
    setProductImage('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    await showSuccess('Product added', `${productName} has been added to your store`);
  };

  return (
    <div className="add-product-container">
      {/* Header */}
      <div className="add-product-header">
        <div>
          <h1 className="admin-page-title">Add New Product</h1>
          <p className="admin-page-subtitle">
            Create and publish a new item to your online tech catalog
          </p>
        </div>
        <Link to="/adminDashboard/products" className="view-catalog-btn">
          View All Products ({getProducts.length}) →
        </Link>
      </div>

      <div className="add-product-layout">
        {/* Form Card */}
        <form onSubmit={addProductsHandler} className="product-form-card">
          <h2 className="form-card-title">Product Information</h2>

          <div className="form-group">
            <label className="form-label">
              Product Title <span className="req">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Apple MacBook Air M3"
              value={productName}
              autoComplete="new-productName"
              onChange={(e) => setProductName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Price (PKR) <span className="req">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 149999"
                value={productPrice}
                autoComplete="new-productPrice"
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Category <span className="req">*</span>
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-select"
              >
                <option value="">-- Select Category --</option>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={productImage}
              autoComplete="new-productImage"
              onChange={(e) => setProductImage(e.target.value)}
              className="form-input"
            />
            <span className="field-hint">
              Paste a direct image link or leave empty for default thumbnail
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Product Description & Specs</label>
            <textarea
              rows={4}
              placeholder="Detail the processor, display, memory, warranty, and features..."
              value={productDescription}
              autoComplete="new-productDescription"
              onChange={(e) => setProductDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-product-btn">
            <span>⚡ Publish Product to Store</span>
          </button>
        </form>

        {/* Live Preview Card */}
        <div className="preview-card-wrapper">
          <div className="preview-card">
            <h3 className="preview-heading">Live Preview</h3>
            <div className="preview-media-box">
              {productImage ? (
                <img
                  src={productImage}
                  alt="Preview"
                  className="preview-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="preview-placeholder">
                  <span>🖼️</span>
                  <p>Image preview appears here</p>
                </div>
              )}
            </div>

            <div className="preview-details">
              <span className="preview-cat-tag">
                {productCategory || 'Category'}
              </span>
              <h4 className="preview-title">
                {productName || 'Product Title Goes Here'}
              </h4>
              <p className="preview-desc">
                {productDescription || 'Short description will appear here...'}
              </p>
              <div className="preview-price-row">
                <span className="preview-price-val">
                  Rs. {productPrice ? Number(productPrice).toLocaleString('en-PK') : '0'} PKR
                </span>
                <span className="preview-stock-pill">● Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
