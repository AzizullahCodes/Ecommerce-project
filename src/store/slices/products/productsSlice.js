import { createSlice } from '@reduxjs/toolkit'
import defaultProducts from '../../../data/defaultProducts.js'
import { getArrayFromStorage } from '../../../utils/storage.js'

// Products load karte waqt: pehle localStorage dekho.
// Agar products maujood hain to unhi ko use karo.
// Nahi hain aur seeding pehli baar ho rahi hai to default products daal do.
// Isse admin sab products delete kar de to wapas wahi default na aa jayein.
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

const initialState = {
  items: loadProducts(),
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Naya product add karte hain
    addProduct: (state, action) => {
      state.items.push(action.payload)
    },
    // Product update — jis product ki productId match kare usko replace kar do
    updateProduct: (state, action) => {
      const payload = action.payload
      state.items = state.items.map((product) =>
        product.productId === payload?.productId ? payload : product
      )
    },
    // Product delete — productId ya id se match karke hata do
    deleteProduct: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(
        (product) => product.productId !== id && product.id !== id
      )
    },
  },
})

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions

export default productsSlice.reducer
