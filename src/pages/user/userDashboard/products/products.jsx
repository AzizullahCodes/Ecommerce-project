import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import './products.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../../features/cart/cartSlice.js';
import { PRODUCT_CATEGORIES } from '../../../../data/defaultProducts.js';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se data nikalna
  const products = useSelector((reduxState) => reduxState.products.items);
  const cartItems = useSelector((reduxState) => reduxState.cart.items);
  const currentUser = useSelector((reduxState) => reduxState.auth.user);

  // Search aur category ki values
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Search text ko ek baar lowercase kar lo
  const searchText = search.trim().toLowerCase();

  // Products ko filter karna (category + search dono se)
  const filteredProducts = products.filter((product) => {
    // 1. Category match hoti hai ya nahi
    const matchesCategory = category === 'All' || product.category === category;

    // 2. Search text name, description, price ya category mein mila ya nahi
    const matchesSearch =
      !searchText ||
      (product.productName || '').toLowerCase().includes(searchText) ||
      (product.productDescription || '').toLowerCase().includes(searchText) ||
      String(product.productPrice || '').toLowerCase().includes(searchText) ||
      (product.category || '').toLowerCase().includes(searchText);

    // Dono sahi hon tabhi product dikhao
    return matchesCategory && matchesSearch;
  });

  // Cart mein product add karna
  const handleAddToCart = (product) => {
    // Login nahi hai to add nahi karne dena
    if (!currentUser) {
      alert('You are not authenticated\nPlease login first');
      return;
    }

    dispatch(addToCart(product));
    alert('Added to cart');
  };

  return (
    <div className="products-page">
      <h1>Products screen</h1>

      {/* Search aur category filter */}
      <div style={{ marginBottom: 16, maxWidth: 360 }}>
        <MDBInput
          label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginTop: 8, padding: 8, width: '100%' }}
        >
          <option value="All">All categories</option>
          {PRODUCT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Products ki list */}
      {filteredProducts.length > 0 ? (
        <MDBRow>
          {filteredProducts.map((product) => (
            <MDBCol sm="4" key={product.productId} className="mb-4">
              <MDBCard>
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  {product.productImage ? (
                    <MDBCardImage
                      src={product.productImage}
                      fluid
                      alt={product.productName}
                      style={{ height: 100, width: 80, objectFit: 'contain' }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 100,
                        width: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f1f1f1',
                      }}
                    >
                      {product.category || 'Product'}
                    </div>
                  )}
                  <a>
                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                  </a>
                </MDBRipple>

                <MDBCardBody>
                  <MDBCardTitle>{product.productName}</MDBCardTitle>
                  <MDBCardText>{product.productDescription}</MDBCardText>
                  {product.category && <MDBCardText>Category: {product.category}</MDBCardText>}
                  <MDBCardText>Price: {product.productPrice} PKR</MDBCardText>
                  <MDBBtn onClick={() => handleAddToCart(product)}>Add to cart</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <h1>No product found</h1>
      )}

      {/* Cart ki info aur button */}
      <p>{cartItems.length} product type(s) in your cart</p>
      <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn onClick={() => navigate('/userDashboard/cart')}>Proceed to cart</MDBBtn>
      </div>
    </div>
  );
};

export default ProductsPage;