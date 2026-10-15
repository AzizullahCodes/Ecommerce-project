const categories = ['Laptops', 'Keyboards', 'Mouse', 'Mobile Phones'];

const seed = [
  // Laptops (5)
  { category: 'Laptops', name: 'HP Pavilion 15', desc: '15.6" FHD, Core i5, 8GB RAM, 512GB SSD', price: 89999 },
  { category: 'Laptops', name: 'Dell Inspiron 14', desc: '14" FHD, Ryzen 5, 8GB RAM, 256GB SSD', price: 74999 },
  { category: 'Laptops', name: 'Lenovo ThinkPad E14', desc: '14" FHD, Core i7, 16GB RAM, 512GB SSD', price: 99999 },
  { category: 'Laptops', name: 'ASUS VivoBook 15', desc: '15.6" FHD, Core i3, 4GB RAM, 256GB SSD', price: 54999 },
  { category: 'Laptops', name: 'Acer Aspire 5', desc: '15.6" FHD, Ryzen 7, 16GB RAM, 1TB SSD', price: 109999 },

  // Keyboards (5)
  { category: 'Keyboards', name: 'Logitech K380', desc: 'Compact multi-device Bluetooth keyboard', price: 4499 },
  { category: 'Keyboards', name: 'Redragon K552', desc: 'Mechanical gaming keyboard, red switches', price: 5999 },
  { category: 'Keyboards', name: 'Keychron K2', desc: 'Wireless mechanical keyboard, RGB', price: 12999 },
  { category: 'Keyboards', name: 'HP K1500', desc: 'Standard wired USB keyboard', price: 1499 },
  { category: 'Keyboards', name: 'Corsair K70 RGB', desc: 'Mechanical gaming keyboard with Cherry MX', price: 18999 },

  // Mouse (5)
  { category: 'Mouse', name: 'Logitech MX Master 3S', desc: 'Ergonomic wireless mouse, 8K DPI', price: 14999 },
  { category: 'Mouse', name: 'Razer DeathAdder V2', desc: 'Gaming mouse, 20K DPI sensor', price: 6999 },
  { category: 'Mouse', name: 'HP X3000', desc: 'Wireless optical mouse', price: 1299 },
  { category: 'Mouse', name: 'Dell MS116', desc: 'Wired optical mouse', price: 699 },
  { category: 'Mouse', name: 'Logitech G502', desc: 'Gaming mouse with adjustable weights', price: 9999 },

  // Mobile Phones (5)
  { category: 'Mobile Phones', name: 'Samsung Galaxy S24', desc: '6.2" AMOLED, 8GB RAM, 256GB', price: 199999 },
  { category: 'Mobile Phones', name: 'iPhone 15', desc: '6.1" OLED, A16 Bionic, 128GB', price: 249999 },
  { category: 'Mobile Phones', name: 'Xiaomi Redmi Note 13', desc: '6.67" AMOLED, 8GB RAM, 256GB', price: 49999 },
  { category: 'Mobile Phones', name: 'Realme 12 Pro', desc: '6.7" AMOLED, 8GB RAM, 256GB', price: 69999 },
  { category: 'Mobile Phones', name: 'OnePlus 12R', desc: '6.78" AMOLED, 12GB RAM, 256GB', price: 89999 },
];

export const PRODUCT_CATEGORIES = categories;

export const defaultProducts = seed.map((p, i) => ({
  productId: `${p.category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
  productName: p.name,
  productImage: '',
  productDescription: p.desc,
  productPrice: p.price,
  quantity: 1,
  category: p.category,
}));

export default defaultProducts;
