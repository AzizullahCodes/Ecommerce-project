import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../../features/products/productsSlice.js';
import './allProducts.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) => {
    const text = search.trim().toLowerCase();
    if (!text) return true;
    return (
      (product.productName || '').toLowerCase().includes(text) ||
      (product.productDescription || '').toLowerCase().includes(text) ||
      String(product.productPrice || '').toLowerCase().includes(text) ||
      (product.category || '').toLowerCase().includes(text)
    );
  });

  const handleDelete = (productId) => {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="all-products-page">
      <h1>Manage Products</h1>

      <div style={{ marginBottom: 16, maxWidth: 360 }}>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <MDBRow>
          {filteredProducts.map((product) => (
            <MDBCol sm="4" key={product.productId ?? product.id} className="mb-4">
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
                    <div style={{ height: 100, width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      No image
                    </div>
                  )}
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{product.productName}</MDBCardTitle>
                  <MDBCardText>{product.productDescription}</MDBCardText>
                  <MDBCardText>Price: {product.productPrice} PKR</MDBCardText>
                  {product.category && <MDBCardText>Category: {product.category}</MDBCardText>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <MDBBtn
                      size="sm"
                      onClick={() => navigate(`/adminDashboard/products/editProduct/${product.productId ?? product.id}`)}
                    >
                      Edit
                    </MDBBtn>
                    <MDBBtn
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(product.productId ?? product.id)}
                    >
                      Delete
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <h1>No products found</h1>
      )}

      <div className="d-grid gap-2 col-6 mx-auto mt-3">
        <MDBBtn onClick={() => navigate('/adminDashboard/products/addProduct')}>Add New Product</MDBBtn>
      </div>
    </div>
  );
};

export default AllProducts;
