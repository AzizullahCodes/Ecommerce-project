// Selectors chhote functions hain jo REDUX STORE se data READ karte hain.
// Yehi ek jagah hai jahan global state ka structure pata hai.

// Cart me mojood tamam products ki list
export const selectCartItems = (state) => state.cart.items

// Cart me tamam quantities ka total (kitne products hain)
export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (count, item) => count + Number(item.quantity || 1),
    0
  )

// Cart ka poora price
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + Number(item.productPrice || 0) * Number(item.quantity || 1),
    0
  )
