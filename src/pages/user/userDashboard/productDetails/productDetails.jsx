import { useDispatch, useSelector, useStore } from 'react-redux';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../../../../store/slices/cart/cartSlice.js';
import { selectCartCount } from '../../../../store/slices/cart/cartSelectors.js';
import { showAddedToCart, showError } from '../../../../utils/sweetAlert.js';
import './productDetails.css';
import { MDBBtn } from 'mdb-react-ui-kit';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();
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

  const handleAddToCart = async () => {
    if (!currentUser) {
      await showError('Not logged in', 'Please login first to add items to your cart.')
      return
    }

    dispatch(addToCart(product))

    // Cart ka naya count nikal ke alert me dikhate hain
    const newCount = selectCartCount(store.getState())
    const goToCart = await showAddedToCart(product.productName, newCount)

    if (goToCart) {
      navigate('/userDashboard/cart')
    }
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
