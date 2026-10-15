export const addToCart = (product) => ({ type: 'cart/addToCart', payload: product })

export const removeFromCart = (id) => ({ type: 'cart/removeFromCart', payload: id })

export const changeQuantity = (payload) => ({ type: 'cart/changeQuantity', payload })

export const setQuantity = (payload) => ({ type: 'cart/setQuantity', payload })

export const clearCart = () => ({ type: 'cart/clearCart' })