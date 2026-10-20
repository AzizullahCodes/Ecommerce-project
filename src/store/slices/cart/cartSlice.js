import { createSlice } from '@reduxjs/toolkit'
import { getArrayFromStorage } from '../../../utils/storage.js'
import { initialState as baseInitialState } from './initialState'

// Cart localStorage se load hota hai taake page reload par cart na khoye
const initialState = {
  ...baseInitialState,
  items: getArrayFromStorage('YourOrders'),
}

// A slice global store ka hissa hai (yahan: cart).
// Isme hum batate hain ke har action par kya hona chahiye.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Cart me product add karte hain.
    // Agar wahi product pehle se cart me hai to sirf uski quantity barha do.
    addToCart: (state, action) => {
      const newProduct = action.payload
      const existingItem = state.items.find(
        (item) => item.productId === newProduct?.productId
      )

      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity || 0) + 1
      } else {
        state.items.push({ ...newProduct, quantity: 1 })
      }
    },

    // Cart se product poora remove karte hain
    removeFromCart: (state, action) => {
      const idToDelete = action.payload
      state.items = state.items.filter((item) => item.productId !== idToDelete)
    },

    // Quantity change karte hain (+1 / -1).
    // Quantity kabhi 1 se neeche nahi jaati — hatane ka kaam "Delete item" button ka hai.
    changeQuantity: (state, action) => {
      const item = action.payload || {}
      const id = item.id ?? item.productId
      const amount = Number(item.amount || 0)

      state.items = state.items.map((cartItem) =>
        cartItem.productId === id
          ? {
              ...cartItem,
              quantity: Math.max(
                1,
                Number(cartItem.quantity || 1) + amount
              ),
            }
          : cartItem
      )
    },

    // Quantity seedha set karte hain (number input se).
    // Khaali ya invalid value ignore karte hain, warna user field clear karte hi
    // item cart se ghalat se hat jata tha.
    setQuantity: (state, action) => {
      const item = action.payload || {}
      const id = item.id ?? item.productId
      const quantity = Number(item.quantity)

      if (!Number.isFinite(quantity) || quantity < 1) {
        return
      }

      state.items = state.items.map((cartItem) =>
        cartItem.productId === id ? { ...cartItem, quantity } : cartItem
      )
    },

    // Quantity ek step kam karte hain.
    // Agar quantity pehle se 1 hai to item cart se hat jata hai.
    decreaseQty: (state, action) => {
      const idToDelete = action.payload
      const targetItem = state.items.find((item) => item.productId === idToDelete)

      // Jo item dhoondna hai wahi cart me nahi hai, to kuch nahi karna
      if (!targetItem) {
        return
      }

      if (Number(targetItem.quantity || 0) <= 1) {
        state.items = state.items.filter((item) => item.productId !== idToDelete)
      } else {
        targetItem.quantity = Number(targetItem.quantity) - 1
      }
    },

    // Poora cart khaali kar dete hain
    clearCart: (state) => {
      state.items = []
    },
  },
})

// Ye action creators hain, inhe dispatch(addToCart(product)) jaise use karte hain
export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  setQuantity,
  decreaseQty,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
