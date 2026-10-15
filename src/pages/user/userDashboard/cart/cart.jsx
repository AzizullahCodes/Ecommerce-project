import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
import React from 'react';
import { changeQuantity, setQuantity, removeFromCart } from '../../../../features/cart/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrders = useSelector((state) => state.cart.items);
  const price = currentOrders.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity || 1), 0);

  return (
    <div className="cart-page">
      <h1>Shopping cart</h1>
      {currentOrders.length > 0 ? (
        <MDBRow>
          {currentOrders.map((product) => (
            <MDBCol sm="4" key={product.productId} className="mb-4">
              <MDBCard>
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  <MDBCardImage src={product.productImage} fluid alt={product.productName} style={{ height: 100, width: 80, objectFit: 'contain' }} />
                  <a><div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} /></a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{product.productName}</MDBCardTitle>
                  <MDBCardText>{product.productDescription}</MDBCardText>
                  <MDBCardText>Price: {Number(product.productPrice) * Number(product.quantity || 1)} PKR</MDBCardText>
                  <MDBBtn onClick={() => dispatch(changeQuantity({ id: product.productId, amount: 1 }))}>+</MDBBtn>
                  <MDBBtn onClick={() => dispatch(changeQuantity({ id: product.productId, amount: -1 }))} disabled={Number(product.quantity || 1) < 2}>-</MDBBtn>
                  <div style={{ margin: '8px 0' }}>
                    <label>
                      Qty:{' '}
                      <input
                        type="number"
                        min="1"
                        value={product.quantity || 1}
                        onChange={(e) => dispatch(setQuantity({ id: product.productId, quantity: e.target.value }))}
                        style={{ width: 60 }}
                      />
                    </label>
                  </div>
                  <MDBBtn onClick={() => dispatch(removeFromCart(product.productId))}>Delete item</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : <h2>Your cart is empty</h2>}
      <hr />
      <h2>Total price: {price} PKR</h2>
      <hr />
      <div className="d-grid gap-2 col-6 mx-auto"><MDBBtn onClick={() => navigate('/userDashboard/checkout')} disabled={currentOrders.length === 0}>Checkout</MDBBtn></div>
    </div>
  );
};

export default Cart;
