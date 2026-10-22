import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateProduct } from '../../../../store/slices/products/productsSlice.js';
import { showError, showSuccess } from '../../../../utils/sweetAlert.js';
import { PRODUCT_CATEGORIES } from '../../../../data/defaultProducts.js';
import './editProduct.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => String(p.productId ?? p.id) === String(productId));

  const [productName, setProductName] = useState(product?.productName || '');
  const [productImage, setProductImage] = useState(product?.productImage || '');
  const [productDescription, setProductDescription] = useState(product?.productDescription || '');
  const [productPrice, setProductPrice] = useState(product?.productPrice || '');
  const [productCategory, setProductCategory] = useState(product?.category || PRODUCT_CATEGORIES[0]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setProductImage(product.productImage || '');
      setProductDescription(product.productDescription || '');
      setProductPrice(product.productPrice || '');
      setProductCategory(product.category || PRODUCT_CATEGORIES[0]);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e?.preventDefault?.();
    if (!product) {
      await showError('Not found', 'Product not found');
      return;
    }
    if (!productName.trim() || !String(productPrice).trim()) {
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
      await showError('Category required', 'Please select a product category');
      return;
    }

    dispatch(
      updateProduct({
        productId: product.productId ?? product.id,
        productName: productName.trim(),
        productImage: productImage.trim(),
        productDescription: productDescription.trim(),
        productPrice: productPrice,
        category: productCategory,
      })
    );
    await showSuccess('Product updated', `${productName} has been updated`);
    navigate('/adminDashboard/products');
  };

  if (!product) {
    return (
      <div className="edit-not-found-card">
        <span className="edit-not-found-icon">🔍</span>
        <h2>Product Not Found</h2>
        <p>The product you are trying to edit does not exist or was removed.</p>
        <button
          className="btn-primary"
          onClick={() => navigate('/adminDashboard/products')}
        >
          Return to All Products
        </button>
      </div>
    );
  }

  return (
    <div className="edit-product-container">
      <div className="edit-product-header">
        <div>
          <h1 className="admin-page-title">Edit Product</h1>
          <p className="admin-page-subtitle">
            Update details, pricing, and category for {product.productName}
          </p>
        </div>
        <Link to="/adminDashboard/products" className="edit-cancel-link">
          ← Cancel & Back
        </Link>
      </div>

      <div className="edit-product-layout">
        <form onSubmit={handleUpdate} className="edit-form-card">
          <h2 className="form-card-title">Product Details</h2>

          <div className="form-group">
            <label className="form-label">
              Product Title <span className="req">*</span>
            </label>
            <input
              type="text"
              value={productName}
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
                value={productPrice}
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
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Product Description</label>
            <textarea
              rows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="edit-actions-row">
            <button type="submit" className="save-changes-btn">
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/adminDashboard/products')}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Live Preview */}
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
                  <p>No image URL provided</p>
                </div>
              )}
            </div>

            <div className="preview-details">
              <span className="preview-cat-tag">{productCategory}</span>
              <h4 className="preview-title">{productName || 'Untitled'}</h4>
              <p className="preview-desc">
                {productDescription || 'No description...'}
              </p>
              <div className="preview-price-row">
                <span className="preview-price-val">
                  Rs. {productPrice ? Number(productPrice).toLocaleString('en-PK') : '0'} PKR
                </span>
                <span className="preview-stock-pill">● In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
