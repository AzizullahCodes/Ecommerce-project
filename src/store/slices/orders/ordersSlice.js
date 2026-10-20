import { createSlice } from '@reduxjs/toolkit'
import { getArrayFromStorage } from '../../../utils/storage.js'

// Orders ka initial state — localStorage se load hote hain
const initialState = {
  items: getArrayFromStorage('OrderHistory'),
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Naya order create karte hain
    createOrder: (state, action) => {
      const payload = action.payload || {}
      const newOrder = {
        id: Date.now(),
        ...payload,
        status: payload.status || 'Pending',
      }
      state.items.push(newOrder)
    },

    // Admin order ka status update karta hai.
    // Order deliver hone par payment status bhi "Paid" ho jata hai.
    updateOrderStatus: (state, action) => {
      const data = action.payload || {}
      const order = state.items.find(
        (item) => String(item.orderId ?? item.id) === String(data.orderId)
      )

      if (!order) {
        return
      }

      order.status = data.status

      if (String(data.status).toLowerCase() === 'delivered') {
        order.paymentStatus = 'Paid'
      }
    },

    // User apna order cancel karta hai
    cancelOrder: (state, action) => {
      const order = state.items.find(
        (item) => String(item.orderId ?? item.id) === String(action.payload)
      )

      if (order) {
        order.status = 'Cancelled'
      }
    },
  },
})

export const { createOrder, updateOrderStatus, cancelOrder } = ordersSlice.actions

export default ordersSlice.reducer
