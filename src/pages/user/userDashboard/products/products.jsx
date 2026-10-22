import React, { useState, useMemo } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../../../data/defaultProducts.js";
import { addToCart } from "../../../../store/slices/cart/cartSlice.js";
import { selectCartCount } from "../../../../store/slices/cart/cartSelectors.js";
import { showAddedToCart, showError } from "../../../../utils/sweetAlert.js";
import "./products.css";

const categoryIcons = {
  All: "⚡",
  Laptops: "💻",
  Keyboards: "⌨️",
  Mouse: "🖱️",
  "Mobile Phones": "📱",
};

const ProductsPage = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector((state) => state.products.items);
  const currentUser = useSelector((state) => state.auth.user);
  const cartCount = useSelector(selectCartCount);

  // Initialize category from URL query param if present
  const initialCategory = searchParams.get("category") || "All";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !searchText ||
        (product.productName || "").toLowerCase().includes(searchText) ||
        (product.productDescription || "").toLowerCase().includes(searchText) ||
        String(product.productPrice || "").toLowerCase().includes(searchText) ||
        (product.category || "").toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      list.sort((a, b) => Number(a.productPrice) - Number(b.productPrice));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => Number(b.productPrice) - Number(a.productPrice));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => (a.productName || "").localeCompare(b.productName || ""));
    }

    return list;
  }, [products, category, search, sortBy]);

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      await showError("Login Required", "Please log in to add items to your cart.");
      return;
    }

    dispatch(addToCart(product));
    const newCount = selectCartCount(store.getState());
    const goToCart = await showAddedToCart(product.productName, newCount);

    if (goToCart) {
      navigate("/userDashboard/cart");
    }
  };

  return (
    <div className="catalog-container">
      {/* Catalog Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Product Catalog</h1>
          <p className="catalog-subtitle">
            Showing {filteredProducts.length} high-performance tech products
          </p>
        </div>

        {cartCount > 0 && (
          <button
            className="header-cart-pill"
            onClick={() => navigate("/userDashboard/cart")}
          >
            <span>🛒 {cartCount} in Cart</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="catalog-controls-card">
        {/* Category Pills */}
        <div className="category-pills-row">
          <button
            className={`category-pill ${category === "All" ? "active" : ""}`}
            onClick={() => handleCategoryChange("All")}
          >
            <span>⚡</span>
            <span>All Categories</span>
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${category === cat ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              <span>{categoryIcons[cat] || "📦"}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Search and Sort Toolbar */}
        <div className="search-sort-row">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by product name, specs, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="catalog-search-input"
            />
            {search && (
              <button
                className="search-clear-btn"
                onClick={() => setSearch("")}
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          <div className="sort-wrapper">
            <label htmlFor="catalog-sort">Sort by:</label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-sort-select"
            >
              <option value="default">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="catalog-products-grid">
          {filteredProducts.map((product) => {
            const id = product.productId ?? product.id;
            const priceFormatted = Number(product.productPrice).toLocaleString("en-PK");
            return (
              <div key={id} className="catalog-card">
                <div
                  className="catalog-card-media"
                  onClick={() => navigate(`/userDashboard/products/${id}`)}
                >
                  <span className="catalog-category-tag">{product.category}</span>
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="catalog-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="catalog-fallback-img">📦</div>
                  )}
                </div>

                <div className="catalog-card-body">
                  <div className="rating-row">
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-score">4.9</span>
                    <span className="stock-badge">In Stock</span>
                  </div>

                  <h3
                    className="catalog-card-title"
                    onClick={() => navigate(`/userDashboard/products/${id}`)}
                  >
                    {product.productName}
                  </h3>

                  <p className="catalog-card-desc">{product.productDescription}</p>

                  <div className="catalog-card-footer">
                    <div className="catalog-price-info">
                      <span className="price-label">Price</span>
                      <span className="catalog-price">Rs. {priceFormatted}</span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="details-quick-btn"
                        onClick={() => navigate(`/userDashboard/products/${id}`)}
                        title="View Product Details"
                      >
                        Details
                      </button>
                      <button
                        className="catalog-add-btn"
                        onClick={() => handleAddToCart(product)}
                        title="Add to Cart"
                      >
                        <span>🛒</span>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="catalog-empty-state">
          <span className="empty-icon">🔍</span>
          <h2>No matching products found</h2>
          <p>Try clearing your search term or selecting a different category.</p>
          <button
            className="empty-reset-btn"
            onClick={() => {
              setSearch("");
              setCategory("All");
              searchParams.delete("category");
              setSearchParams(searchParams);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating Cart Button for Mobile & Convenience */}
      {cartCount > 0 && (
        <div className="floating-cart-bar">
          <div className="floating-cart-info">
            <span className="cart-badge-circle">{cartCount}</span>
            <span>Items in your cart</span>
          </div>
          <button
            className="floating-cart-action"
            onClick={() => navigate("/userDashboard/cart")}
          >
            <span>Proceed to Cart</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
