export const setProducts = (payload) => ({ type: 'products/setProducts', payload })

export const addProduct = (payload) => ({ type: 'products/addProduct', payload })

export const updateProduct = (payload) => ({ type: 'products/updateProduct', payload })

export const deleteProduct = (id) => ({ type: 'products/deleteProduct', payload: id })

export const clearProducts = () => ({ type: 'products/clearProducts' })