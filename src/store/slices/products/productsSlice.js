import { createSlice } from '@reduxjs/toolkit'
import defaultProducts from '../../../data/defaultProducts.js'
import { getArrayFromStorage } from '../../../utils/storage.js'

// Default products ke IDs — in se pata chalta hai ke kaunsa product
// admin ne khud add kiya hai aur kaunsa app ke saath aaya tha
const DEFAULT_PRODUCT_IDS = defaultProducts.map((product) => product.productId)

// Catalog banao: default products + admin ke add kiye hue products.
// - Default product admin ne delete kiya hua ho to use nahi lena
// - Default product admin ne edit kiya hua ho to edited version dikhana
// - Admin ke add kiye products (jo default nahi hain) bhi saath rakhna
const buildCatalog = (savedProducts, deletedIds) => {
  const savedById = new Map(
    savedProducts.map((product) => [product.productId, product])
  )

  const catalog = []

  for (const product of defaultProducts) {
    if (deletedIds.includes(product.productId)) {
      continue
    }
    const saved = savedById.get(product.productId)
    if (saved) {
      catalog.push({
        ...product,
        ...saved,
        productImage: saved.productImage && saved.productImage.trim() !== '' ? saved.productImage : product.productImage,
      })
    } else {
      catalog.push(product)
    }
  }

  for (const product of savedProducts) {
    if (!DEFAULT_PRODUCT_IDS.includes(product.productId)) {
      catalog.push(product)
    }
  }

  return catalog
}

// Jis default product ko admin ne delete kiya hai, uski list
const savedProducts = getArrayFromStorage('productList')
const deletedIds = getArrayFromStorage('deletedProductIds')

const initialState = {
  items: buildCatalog(savedProducts, deletedIds),
  deletedIds,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Naya product add karte hain
    addProduct: (state, action) => {
      const product = action.payload
      state.items.push(product)

      // Agar admin ne koi default product dobara add kiya to use un-delete kar do
      if (DEFAULT_PRODUCT_IDS.includes(product.productId)) {
        state.deletedIds = state.deletedIds.filter(
          (id) => id !== product.productId
        )
      }
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

      // Default product delete kiya to yaad rakhna,
      // warna page reload par wapas aa jayega
      if (DEFAULT_PRODUCT_IDS.includes(id) && !state.deletedIds.includes(id)) {
        state.deletedIds.push(id)
      }
    },

    // Admin chahta hai ke saare default products wapas aa jayein
    restoreDefaultProducts: {
      reducer: (state, action) => {
        state.deletedIds = []
        state.items = action.payload
      },
      prepare: () => ({
        payload: buildCatalog(getArrayFromStorage('productList'), []),
      }),
    },
  },
})

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  restoreDefaultProducts,
} = productsSlice.actions

export default productsSlice.reducer
