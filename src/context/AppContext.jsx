import { useSyncExternalStore } from 'react'
import defaultProducts from '../data/defaultProducts.js'
import { getArrayFromStorage } from '../utils/storage.js'

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

const loadProducts = () => {
  const savedProducts = getArrayFromStorage('productList')
  const alreadySeeded = localStorage.getItem('productListSeeded') === 'true'

  if (savedProducts.length > 0) return savedProducts

  if (!alreadySeeded) {
    localStorage.setItem('productListSeeded', 'true')
    localStorage.setItem('productList', JSON.stringify(defaultProducts))
    return defaultProducts
  }

  return []
}

const readState = () => ({
  auth: { user: safeParse(localStorage.getItem('loggedInUser'), null) },
  users: { items: getArrayFromStorage('users') },
  products: { items: loadProducts() },
  cart: { items: getArrayFromStorage('YourOrders') },
  orders: { items: getArrayFromStorage('OrderHistory') },
})

let state = readState()
const listeners = new Set()

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const persist = (nextState) => {
  if (nextState.auth.user) {
    localStorage.setItem('loggedInUser', JSON.stringify(nextState.auth.user))
  } else {
    localStorage.removeItem('loggedInUser')
  }
  localStorage.setItem('users', JSON.stringify(nextState.users.items))
  localStorage.setItem('productList', JSON.stringify(nextState.products.items))
  localStorage.setItem('YourOrders', JSON.stringify(nextState.cart.items))
  localStorage.setItem('OrderHistory', JSON.stringify(nextState.orders.items))
}

const dispatch = (action) => {
  const type = action?.type
  const payload = action?.payload

  switch (type) {
    case 'auth/setUser':
      state = { ...state, auth: { user: payload } }
      break
    case 'auth/clearUser':
      state = { ...state, auth: { user: null } }
      break

    case 'users/addUser':
      state = {
        ...state,
        users: { items: [...state.users.items, payload] },
      }
      break

    case 'products/addProduct':
      state = {
        ...state,
        products: { items: [...state.products.items, payload] },
      }
      break
    case 'products/updateProduct':
      state = {
        ...state,
        products: {
          items: state.products.items.map((product) =>
            product.productId === payload?.productId ? payload : product
          ),
        },
      }
      break
    case 'products/deleteProduct':
      state = {
        ...state,
        products: {
          items: state.products.items.filter((product) => product.productId !== payload && product.id !== payload),
        },
      }
      break

    case 'cart/addToCart': {
      const cartItems = state.cart.items
      const oldItem = cartItems.find((item) => item.productId === payload?.productId)
      const nextCartItems = oldItem
        ? cartItems.map((item) =>
            item.productId === payload?.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cartItems, { ...payload, quantity: 1 }]
      state = { ...state, cart: { items: nextCartItems } }
      break
    }
    case 'cart/removeFromCart':
      state = {
        ...state,
        cart: {
          items: state.cart.items.filter((item) => item.productId !== payload),
        },
      }
      break
    case 'cart/changeQuantity': {
      const item = payload || {}
      const id = item.id ?? item.productId
      const updatedItems = state.cart.items
        .map((cartItem) =>
          cartItem.productId === id
            ? { ...cartItem, quantity: cartItem.quantity + item.amount }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity >= 1)
      state = { ...state, cart: { items: updatedItems } }
      break
    }
    case 'cart/setQuantity': {
      const item = payload || {}
      const id = item.id ?? item.productId
      const updatedItems = state.cart.items
        .map((cartItem) =>
          cartItem.productId === id
            ? { ...cartItem, quantity: Number(item.quantity) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity >= 1)
      state = { ...state, cart: { items: updatedItems } }
      break
    }
    case 'cart/clearCart':
      state = { ...state, cart: { items: [] } }
      break

    case 'orders/createOrder': {
      const newOrder = { id: Date.now(), ...(payload || {}), status: payload?.status || 'Pending' }
      state = { ...state, orders: { items: [...state.orders.items, newOrder] } }
      break
    }
    case 'orders/updateOrderStatus': {
      const data = payload || {}
      const existing = state.orders.items.find(
        (order) => String(order.orderId ?? order.id) === String(data.orderId)
      )
      if (existing) {
        const updatedOrder = {
          ...existing,
          status: data.status,
          paymentStatus:
            String(data.status).toLowerCase() === 'delivered' ? 'Paid' : existing.paymentStatus,
        }
        state = {
          ...state,
          orders: {
            items: state.orders.items.map((order) =>
              String(order.orderId ?? order.id) === String(data.orderId)
                ? updatedOrder
                : order
            ),
          },
        }
      }
      break
    }
    case 'orders/cancelOrder': {
      const existing = state.orders.items.find(
        (order) => String(order.orderId ?? order.id) === String(payload)
      )
      if (existing) {
        state = {
          ...state,
          orders: {
            items: state.orders.items.map((order) =>
              String(order.orderId ?? order.id) === String(payload)
                ? { ...order, status: 'Cancelled' }
                : order
            ),
          },
        }
      }
      break
    }

    default:
      return state
  }

  persist(state)
  listeners.forEach((listener) => listener())
  return state
}

export function useDispatch() {
  return dispatch
}

export function useSelector(selector) {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state))
}
