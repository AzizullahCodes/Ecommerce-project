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

// State ko localStorage me save karte hain, taake page reload ke baad
// bhi data waise hi rahe.
const persistState = () => {
  const { auth, users, products, cart, orders } = store.getState()

  if (auth.user) {
    localStorage.setItem('loggedInUser', JSON.stringify(auth.user))
  } else {
    localStorage.removeItem('loggedInUser')
  }

  localStorage.setItem('users', JSON.stringify(users.items))
  localStorage.setItem('productList', JSON.stringify(products.items))
  localStorage.setItem('deletedProductIds', JSON.stringify(products.deletedIds))
  localStorage.setItem('YourOrders', JSON.stringify(cart.items))
  localStorage.setItem('OrderHistory', JSON.stringify(orders.items))

  // Purana flag ab zaroorat ka nahi — default products hamesha catalog me rehte hain
  localStorage.removeItem('productListSeeded')
}

// Har change ke baad save karo
store.subscribe(persistState)

// App start hote hi bhi ek baar save karo, taake localStorage
// turant store ke sath match kare
persistState()

export default store
