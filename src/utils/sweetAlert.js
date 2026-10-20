import Swal from 'sweetalert2'

// SweetAlert2 ka common setup — har alert app ke theme ke sath match kare
const baseOptions = {
  customClass: {
    popup: 'swal-popup',
    confirmButton: 'swal-confirm-btn',
    cancelButton: 'swal-cancel-btn',
  },
  buttonsStyling: false,
  backdrop: 'rgba(15, 15, 25, 0.55)',
}

// Success alert (green) — "kaam ho gaya"
export const showSuccess = (title, text) =>
  Swal.fire({
    ...baseOptions,
    icon: 'success',
    title,
    text,
    confirmButtonText: 'OK',
  })

// Error alert (red) — "kuch galat ho gaya"
export const showError = (title, text) =>
  Swal.fire({
    ...baseOptions,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK',
  })

// Info alert (blue) — "thoda sa guidance"
export const showInfo = (title, text) =>
  Swal.fire({
    ...baseOptions,
    icon: 'info',
    title,
    text,
    confirmButtonText: 'OK',
  })

// Confirm dialog — promise true resolve karta hai jab user "Confirm" kare,
// Cancel ya band karne par false.
export const showConfirm = (title, text = '', confirmLabel = 'Yes, confirm') =>
  Swal.fire({
    ...baseOptions,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmLabel,
    cancelButtonText: 'Cancel',
  }).then((result) => result.isConfirmed)

// Add to cart ka alert — "View cart" aur "Keep shopping" ke sath.
// Promise true resolve karta hai jab user "View cart" click kare, warna false.
export const showAddedToCart = (productName, cartCount = 0) =>
  Swal.fire({
    ...baseOptions,
    icon: 'success',
    title: 'Added to cart!',
    text: `${productName} is now in your cart.${
      cartCount > 0 ? ` You have ${cartCount} item(s) in your cart.` : ''
    }`,
    showCancelButton: true,
    confirmButtonText: 'View cart',
    cancelButtonText: 'Keep shopping',
  }).then((result) => result.isConfirmed)
