import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, restoreDefaultProducts } from '../../../../store/slices/products/productsSlice.js';
import { showConfirm, showSuccess } from '../../../../utils/sweetAlert.js';
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
  const deletedIds = useSelector((state) => state.products.deletedIds);
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

  const handleDelete = async (productId) => {
    const confirmed = await showConfirm(
      'Delete product?',
      'This product will be removed from your store. This cannot be undone.',
      'Yes, delete it'
    );

    if (confirmed) {
      dispatch(deleteProduct(productId));
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

      {/* Default products delete hue hon to wapas laane ka option */}
      {deletedIds.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <MDBBtn color="warning" onClick={handleRestoreDefaults}>
            Restore {deletedIds.length} default product(s)
          </MDBBtn>
        </div>
      )}

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
