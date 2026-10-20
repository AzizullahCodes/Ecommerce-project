import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice.js'
import usersReducer from './slices/users/usersSlice.js'
import productsReducer from './slices/products/productsSlice.js'
import cartReducer from './slices/cart/cartSlice.js'
import ordersReducer from './slices/orders/ordersSlice.js'

// Ye poora app ka global store hai.
// Har slice store ka ek hissa hai (auth, users, products, cart, orders).
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
})

// Har change ke baad state ko localStorage me save karte hain,
// taake page reload ke baad bhi data waise hi rahe.
store.subscribe(() => {
  const { auth, users, products, cart, orders } = store.getState()

  if (auth.user) {
    localStorage.setItem('loggedInUser', JSON.stringify(auth.user))
  } else {
    localStorage.removeItem('loggedInUser')
  }

  localStorage.setItem('users', JSON.stringify(users.items))
  localStorage.setItem('productList', JSON.stringify(products.items))
  localStorage.setItem('YourOrders', JSON.stringify(cart.items))
  localStorage.setItem('OrderHistory', JSON.stringify(orders.items))
})

export default store
