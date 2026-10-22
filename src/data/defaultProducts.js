const categories = ['Laptops', 'Keyboards', 'Mouse', 'Mobile Phones'];

const seed = [
  // Laptops (5)
  {
    category: 'Laptops',
    name: 'HP Pavilion 15',
    desc: '15.6" FHD, Core i5, 8GB RAM, 512GB SSD',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Laptops',
    name: 'Dell Inspiron 14',
    desc: '14" FHD, Ryzen 5, 8GB RAM, 256GB SSD',
    price: 74999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Laptops',
    name: 'Lenovo ThinkPad E14',
    desc: '14" FHD, Core i7, 16GB RAM, 512GB SSD',
    price: 99999,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Laptops',
    name: 'ASUS VivoBook 15',
    desc: '15.6" FHD, Core i3, 4GB RAM, 256GB SSD',
    price: 54999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Laptops',
    name: 'Acer Aspire 5',
    desc: '15.6" FHD, Ryzen 7, 16GB RAM, 1TB SSD',
    price: 109999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
  },

  // Keyboards (5)
  {
    category: 'Keyboards',
    name: 'Logitech K380',
    desc: 'Compact multi-device Bluetooth keyboard',
    price: 4499,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Keyboards',
    name: 'Redragon K552',
    desc: 'Mechanical gaming keyboard, red switches',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Keyboards',
    name: 'Keychron K2',
    desc: 'Wireless mechanical keyboard, RGB',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Keyboards',
    name: 'HP K1500',
    desc: 'Standard wired USB keyboard',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Keyboards',
    name: 'Corsair K70 RGB',
    desc: 'Mechanical gaming keyboard with Cherry MX',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1560762484-813fc97650a0?w=500&auto=format&fit=crop&q=60',
  },

  // Mouse (5)
  {
    category: 'Mouse',
    name: 'Logitech MX Master 3S',
    desc: 'Ergonomic wireless mouse, 8K DPI',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mouse',
    name: 'Razer DeathAdder V2',
    desc: 'Gaming mouse, 20K DPI sensor',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mouse',
    name: 'HP X3000',
    desc: 'Wireless optical mouse',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mouse',
    name: 'Dell MS116',
    desc: 'Wired optical mouse',
    price: 699,
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mouse',
    name: 'Logitech G502',
    desc: 'Gaming mouse with adjustable weights',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=500&auto=format&fit=crop&q=60',
  },

  // Mobile Phones (5)
  {
    category: 'Mobile Phones',
    name: 'Samsung Galaxy S24',
    desc: '6.2" AMOLED, 8GB RAM, 256GB',
    price: 199999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mobile Phones',
    name: 'iPhone 15',
    desc: '6.1" OLED, A16 Bionic, 128GB',
    price: 249999,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mobile Phones',
    name: 'Xiaomi Redmi Note 13',
    desc: '6.67" AMOLED, 8GB RAM, 256GB',
    price: 49999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mobile Phones',
    name: 'Realme 12 Pro',
    desc: '6.7" AMOLED, 8GB RAM, 256GB',
    price: 69999,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop&q=60',
  },
  {
    category: 'Mobile Phones',
    name: 'OnePlus 12R',
    desc: '6.78" AMOLED, 12GB RAM, 256GB',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=500&auto=format&fit=crop&q=60',
  },
];

export const PRODUCT_CATEGORIES = categories;

export const defaultProducts = seed.map((p, i) => ({
  productId: `${p.category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
  productName: p.name,
  productImage: p.image || '',
  productDescription: p.desc,
  productPrice: p.price,
  quantity: 1,
  category: p.category,
}));

export default defaultProducts;