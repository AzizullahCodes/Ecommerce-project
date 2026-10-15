export const setOrders = (payload) => ({ type: 'orders/setOrders', payload })

export const createOrder = (payload) => ({ type: 'orders/createOrder', payload })

export const updateOrderStatus = (payload) => ({ type: 'orders/updateOrderStatus', payload })

export const cancelOrder = (payload) => ({ type: 'orders/cancelOrder', payload })

export const clearOrders = () => ({ type: 'orders/clearOrders' })