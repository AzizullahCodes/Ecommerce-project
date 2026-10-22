import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteProduct, restoreDefaultProducts } from '../../../../store/slices/products/productsSlice.js';
import { showConfirm, showSuccess } from '../../../../utils/sweetAlert.js';
import './allProducts.css';

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const deletedIds = useSelector((state) => state.products.deletedIds);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const text = search.trim().toLowerCase();
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    const matchesSearch =
      !text ||
      (product.productName || '').toLowerCase().includes(text) ||
      (product.productDescription || '').toLowerCase().includes(text) ||
      String(product.productPrice || '').toLowerCase().includes(text) ||
      (product.category || '').toLowerCase().includes(text);

    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (productId) => {
    const confirmed = await showConfirm(
      'Delete product?',
      'This product will be removed from your store. This cannot be undone.',
      'Yes, delete it'
    );

    if (confirmed) {
      dispatch(deleteProduct(productId));
      await showSuccess('Deleted', 'Product was removed successfully');
    }
  };

  const handleRestoreDefaults = async () => {
    const confirmed = await showConfirm(
      'Restore default products?',
      'All the default products will come back. Products you added yourself will stay.',
      'Yes, restore them'
    );

    if (confirmed) {
      dispatch(restoreDefaultProducts());
      await showSuccess('Defaults restored', 'All default products are back in your store');
    }
  };

  return (
    <div className="admin-inventory-container">
      {/* Header */}
      <div className="admin-inventory-header">
        <div>
          <h1 className="admin-page-title">Product Inventory</h1>
          <p className="admin-page-subtitle">
            Manage your store catalog, edit prices, monitor stock, and add items
          </p>
        </div>
        <Link to="/adminDashboard/products/addProduct" className="admin-add-new-btn">
          <span>+ Add New Product</span>
        </Link>
      </div>

      {/* Restore Banner if any defaults were deleted */}
      {deletedIds.length > 0 && (
        <div className="restore-defaults-alert">
          <div>
            <strong>Default products are hidden.</strong>
            <span> {deletedIds.length} original item(s) have been deleted.</span>
          </div>
          <button className="restore-btn" onClick={handleRestoreDefaults}>
            Restore {deletedIds.length} Default Product(s)
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="inventory-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products by title, price, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="inventory-search-input"
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-box">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="inventory-filter-select"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="inventory-grid">
          {filteredProducts.map((product) => {
            const id = product.productId ?? product.id;
            const priceFormatted = Number(product.productPrice).toLocaleString('en-PK');

            return (
              <div key={id} className="inventory-card">
                <div className="inventory-media">
                  <span className="inventory-cat-tag">{product.category || 'Item'}</span>
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="inventory-img"
                    />
                  ) : (
                    <div className="inventory-fallback-img">📦</div>
                  )}
                </div>

                <div className="inventory-card-body">
                  <h3 className="inventory-title">{product.productName}</h3>
                  <p className="inventory-desc">{product.productDescription}</p>

                  <div className="inventory-price-row">
                    <span className="inventory-price">Rs. {priceFormatted} PKR</span>
                    <span className="inventory-stock-pill">In Stock</span>
                  </div>

                  <div className="inventory-card-actions">
                    <button
                      className="edit-action-btn"
                      onClick={() =>
                        navigate(`/adminDashboard/products/editProduct/${id}`)
                      }
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-action-btn"
                      onClick={() => handleDelete(id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="inventory-empty-card">
          <span className="empty-icon">📦</span>
          <h2>No products match your criteria</h2>
          <p>Try modifying your search query or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
