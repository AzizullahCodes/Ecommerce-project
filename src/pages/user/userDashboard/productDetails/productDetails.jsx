import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../../../../features/cart/cartSlice.js';
import './productDetails.css';
import { MDBBtn } from 'mdb-react-ui-kit';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items.find((p) => String(p.productId ?? p.id) === String(productId)));
  const currentUser = useSelector((state) => state.auth.user);

  if (!product) {
    return (
      <div>
        <h1>Product Details</h1>
        <p>Product not found.</p>
        <MDBBtn onClick={() => navigate('/userDashboard/products')}>Back to Products</MDBBtn>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!currentUser) { alert('Please login first'); return; }
    dispatch(addToCart(product));
    alert('Added to cart');
  };

  return (
    <div className="product-details-page">
      <h1>{product.productName}</h1>
      {product.productImage ? <img src={product.productImage} alt={product.productName} style={{ height: 200, objectFit: 'contain' }} /> : null}
      {product.category && <p>Category: {product.category}</p>}
    <p>{product.productDescription}</p>
      <h3>Price: {product.productPrice} PKR</h3>
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <MDBBtn onClick={handleAddToCart}>Add to Cart</MDBBtn>
        <MDBBtn color="light" onClick={() => navigate('/userDashboard/products')}>Back</MDBBtn>
      </div>
    </div>
  );
};

export default ProductDetails;
