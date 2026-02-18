const products = [
  {
    id: 101,
    title: "Men's Slim Fit Joggers",
    slug: "mens-slim-fit-joggers",
    price: 1499,
    description:
      "Comfortable slim fit joggers made from breathable cotton blend, perfect for workouts or casual wear.",
    categories: [
      {
        id: 1,
        name: "Men",
        slug: "men",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1580906853203-f493cea9ff28"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:21.000Z",
    updatedAt: "2026-01-26T12:08:21.000Z",
  },
  {
    id: 102,
    title: "Women's Summer Dress",
    slug: "womens-summer-dress",
    price: 2499,
    description:
      "Lightweight floral summer dress with adjustable straps, ideal for casual outings and beach days.",
    categories: [
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
    ],
    images: ["https://images.unsplash.com/photo-1762154057377-cc9d3dd6900c"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:22.000Z",
    updatedAt: "2026-01-26T12:08:22.000Z",
  },
  {
    id: 103,
    title: "Modern Wooden Coffee Table",
    slug: "modern-wooden-coffee-table",
    price: 7999,
    description:
      "Minimalist wooden coffee table with a smooth finish, perfect for living rooms and lounges.",
    categories: [
      {
        id: 3,
        name: "Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1680546330888-f995d2d64571",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:23.000Z",
    updatedAt: "2026-01-26T12:08:23.000Z",
  },
  {
    id: 104,
    title: "Women's Leather Handbag",
    slug: "womens-leather-handbag",
    price: 3499,
    description:
      "Elegant leather handbag with structured design, flap closure, and long handles. Perfect for both casual and formal outings.",
    categories: [
      {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
    ],
    images: ["https://images.unsplash.com/photo-1765114470103-b68286cf9c6d"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:24.000Z",
    updatedAt: "2026-01-26T12:08:24.000Z",
  },
  {
    id: 105,
    title: "Modern Ergonomic Office Chair",
    slug: "modern-ergonomic-office-chair",
    price: 8999,
    description:
      "A sleek ergonomic office chair with adjustable height, breathable mesh back, and cushioned seat for all-day comfort.",
    categories: [
      {
        id: 5,
        name: "Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1750306957820-f778b67c4e13"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:25.000Z",
    updatedAt: "2026-01-26T12:08:25.000Z",
  },
  {
    id: 106,
    title: "Wireless Over-Ear Headphones",
    slug: "wireless-over-ear-headphones",
    price: 4999,
    description:
      "Premium wireless headphones with noise cancellation, cushioned ear cups, and long battery life. Ideal for music and work.",
    categories: [
      {
        id: 6,
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:26.000Z",
    updatedAt: "2026-01-26T12:08:26.000Z",
  },
  {
    id: 107,
    title: "Wooden Dining Table Set",
    slug: "wooden-dining-table-set",
    price: 15999,
    description:
      "Spacious wooden dining table with six chairs, crafted from durable hardwood. Perfect for family meals and gatherings.",
    categories: [
      {
        id: 7,
        name: "Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1664297652617-61e5ec44d26f",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:27.000Z",
    updatedAt: "2026-01-26T12:08:27.000Z",
  },
  {
    id: 108,
    title: "Men's Running Shoes",
    slug: "mens-running-shoes",
    price: 2999,
    description:
      "Lightweight running shoes with cushioned sole and breathable mesh upper. Designed for performance and everyday wear.",
    categories: [
      {
        id: 13,
        name: "Footwear",
        slug: "footwear",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1606890657878-16393aa45766"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:28.000Z",
    updatedAt: "2026-01-26T12:08:28.000Z",
  },
  {
    id: 109,
    title: "Women's Sports Sneakers",
    slug: "womens-sports-sneakers",
    price: 3299,
    description:
      "Breathable mesh sneakers designed for running and training. Lightweight sole with excellent grip and cushioning.",
    categories: [
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
      {
        id: 13,
        name: "Footwear",
        slug: "footwear",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1592771404380-467f535c7c4f"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:29.000Z",
    updatedAt: "2026-01-26T12:08:29.000Z",
  },
  {
    id: 110,
    title: "Smartwatch with Fitness Tracker",
    slug: "smartwatch-fitness-tracker",
    price: 6999,
    description:
      "Modern smartwatch with heart rate monitor, step counter, and customizable watch faces. Compatible with iOS and Android.",
    categories: [
      {
        id: 6,
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1750745135872-7637f61e1715",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:30.000Z",
    updatedAt: "2026-01-26T12:08:30.000Z",
  },
  {
    id: 111,
    title: "Wooden Bookshelf",
    slug: "wooden-bookshelf",
    price: 5999,
    description:
      "Tall wooden bookshelf with five spacious shelves, perfect for organizing books, decor, and storage baskets.",
    categories: [
      {
        id: 3,
        name: "Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1543248939-4296e1fea89b"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:31.000Z",
    updatedAt: "2026-01-26T12:08:31.000Z",
  },
  {
    id: 112,
    title: "Men's Leather Wallet",
    slug: "mens-leather-wallet",
    price: 1299,
    description:
      "Classic brown leather wallet with multiple card slots, cash compartment, and RFID protection.",
    categories: [
      {
        id: 1,
        name: "Men",
        slug: "men",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1675668409093-244704d3ba93"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:32.000Z",
    updatedAt: "2026-01-26T12:08:32.000Z",
  },
  {
    id: 113,
    title: "Women's Sunglasses",
    slug: "womens-sunglasses",
    price: 1999,
    description:
      "Stylish oversized sunglasses with UV protection lenses. Perfect for sunny days and fashion statements.",
    categories: [
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
      {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1673758910931-8fab2b194702",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:33.000Z",
    updatedAt: "2026-01-26T12:08:33.000Z",
  },
  {
    id: 114,
    title: "Men's Formal Blazer",
    slug: "mens-formal-blazer",
    price: 4499,
    description:
      "Classic navy blue blazer tailored for a sharp fit. Perfect for office wear and formal occasions.",
    categories: [
      {
        id: 1,
        name: "Men",
        slug: "men",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1656453260440-ae7817f559fd"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:34.000Z",
    updatedAt: "2026-01-26T12:08:34.000Z",
  },
  {
    id: 115,
    title: "Women's Winter Coat",
    slug: "womens-winter-coat",
    price: 5999,
    description:
      "Warm wool blend coat with button closure and belt tie. Stylish and cozy for cold weather.",
    categories: [
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
    ],
    images: ["https://images.unsplash.com/photo-1680690395101-1b2a56c0ac21"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:35.000Z",
    updatedAt: "2026-01-26T12:08:35.000Z",
  },
  {
    id: 116,
    title: "Bluetooth Portable Speaker",
    slug: "bluetooth-portable-speaker",
    price: 2999,
    description:
      "Compact wireless speaker with deep bass and 12-hour battery life. Perfect for travel and parties.",
    categories: [
      {
        id: 6,
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
    images: ["https://images.unsplash.com/photo-1762328498684-e597f4ceaa43"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:36.000Z",
    updatedAt: "2026-01-26T12:08:36.000Z",
  },
  {
    id: 117,
    title: "Wooden Bed Frame",
    slug: "wooden-bed-frame",
    price: 18999,
    description:
      "Queen-size wooden bed frame with sturdy construction and minimalist design. Adds elegance to any bedroom.",
    categories: [
      {
        id: 3,
        name: "Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1661698951100-064e4ae229fd",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:37.000Z",
    updatedAt: "2026-01-26T12:08:37.000Z",
  },
  {
    id: 118,
    title: "Men's Casual T-Shirt",
    slug: "mens-casual-tshirt",
    price: 999,
    description:
      "Soft cotton crew neck t-shirt in solid colors. Everyday essential for layering or casual wear.",
    categories: [
      {
        id: 1,
        name: "Men",
        slug: "men",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 9,
        name: "Clothing",
        slug: "clothing",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1666358085449-a10a39f33942"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:38.000Z",
    updatedAt: "2026-01-26T12:08:38.000Z",
  },
  {
    id: 119,
    title: "Women's Yoga Leggings",
    slug: "womens-yoga-leggings",
    price: 1799,
    description:
      "Stretchable high-waist leggings designed for yoga and workouts. Breathable fabric with snug fit.",
    categories: [
      {
        id: 2,
        name: "Women",
        slug: "women",
        image: "https://images.unsplash.com/photo-1520975918318-3c8c1f3f9e2d",
      },
    ],
    images: ["https://images.unsplash.com/photo-1768929096150-9a76dc1d6560"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:39.000Z",
    updatedAt: "2026-01-26T12:08:39.000Z",
  },
  {
    id: 120,
    title: "Kitchen Blender",
    slug: "kitchen-blender",
    price: 3499,
    description:
      "High-power blender with multiple speed settings and durable glass jar. Perfect for smoothies and cooking.",
    categories: [
      {
        id: 6,
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        id: 15,
        name: "Kitchen Appliances",
        slug: "kitchen-appliances",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1683140593992-4a963b0b9f4b",
    ],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:40.000Z",
    updatedAt: "2026-01-26T12:08:40.000Z",
  },
  {
    id: 121,
    title: "Ceramic Flower Vase",
    slug: "ceramic-flower-vase",
    price: 1299,
    description:
      "Handcrafted ceramic vase with a matte finish. Perfect for fresh flowers or dried stems to elevate your home decor.",
    categories: [
      {
        id: 10,
        name: "Home Decor",
        slug: "home-decor",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1708985411160-8fd354acdc2a"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:41.000Z",
    updatedAt: "2026-01-26T12:08:41.000Z",
  },
  {
    id: 122,
    title: "Modern Bedside Lamp",
    slug: "modern-bedside-lamp",
    price: 2499,
    description:
      "Minimalist bedside lamp with a warm LED glow and wooden base. adjustable brightness for reading.",
    categories: [
      {
        id: 10,
        name: "Home Decor",
        slug: "home-decor",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1614635884840-85cf80d23844"],
    inStock: false,
    quantity: 0,
    creationAt: "2026-01-26T12:08:42.000Z",
    updatedAt: "2026-01-26T12:08:42.000Z",
  },
  {
    id: 123,
    title: "Indoor Potted Rubber Plant",
    slug: "indoor-potted-rubber-plant",
    price: 899,
    description:
      "Live indoor rubber plant in a decorative white pot. Low maintenance and purifies air naturally.",
    categories: [
      {
        id: 10,
        name: "Home Decor",
        slug: "home-decor",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1762008085289-d5c66f90cfca"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:43.000Z",
    updatedAt: "2026-01-26T12:08:43.000Z",
  },
  {
    id: 124,
    title: "Premium Adult Dog Food (2.5kg)",
    slug: "premium-adult-dog-food",
    price: 1899,
    description:
      "Nutrient-rich dry dog food with real chicken and vegetables. Supports healthy digestion and shiny coat.",
    categories: [
      {
        id: 16,
        name: "Pet Food",
        slug: "pet-food",
        image: "https://images.unsplash.com/photo-1589924691195-41432c84c161",
      },
    ],
    images: ["https://images.unsplash.com/photo-1684882726821-2999db517441"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:44.000Z",
    updatedAt: "2026-01-26T12:08:44.000Z",
  },
  {
    id: 125,
    title: "Gourmet Wet Cat Food",
    slug: "gourmet-wet-cat-food",
    price: 499,
    description:
      "Pack of 6 wet cat food pouches. Tuna and salmon flavor, rich in Omega-3 for heart health.",
    categories: [
      {
        id: 16,
        name: "Pet Food",
        slug: "pet-food",
        image: "https://images.unsplash.com/photo-1589924691195-41432c84c161",
      },
    ],
    images: [
      "https://www.shutterstock.com/image-photo/bucharest-romania-march-14-2024-600nw-2439920335.jpg",
    ],
    inStock: false,
    quantity: 0,
    creationAt: "2026-01-26T12:08:45.000Z",
    updatedAt: "2026-01-26T12:08:45.000Z",
  },
  {
    id: 126,
    title: "Vitamin C Face Serum",
    slug: "vitamin-c-face-serum",
    price: 999,
    description:
      "Brightening face serum with 10% Vitamin C and Hyaluronic Acid. Reduces dark spots and hydrates skin.",
    categories: [
      {
        id: 17,
        name: "Beauty",
        slug: "beauty",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      },
    ],
    images: ["https://images.unsplash.com/photo-1731599974315-91a82bb816a6"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:46.000Z",
    updatedAt: "2026-01-26T12:08:46.000Z",
  },
  {
    id: 127,
    title: "Non-Slip Yoga Mat",
    slug: "non-slip-yoga-mat",
    price: 1199,
    description:
      "Eco-friendly yoga mat with extra cushioning and non-slip texture. Ideal for yoga, pilates, and home workouts.",
    categories: [
      {
        id: 18,
        name: "Sports",
        slug: "sports",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
      },
    ],
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:47.000Z",
    updatedAt: "2026-01-26T12:08:47.000Z",
  },
  {
    id: 128,
    title: "Travel Laptop Backpack",
    slug: "travel-laptop-backpack",
    price: 3299,
    description:
      "Water-resistant travel backpack with dedicated laptop compartment and USB charging port.",
    categories: [
      {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        id: 1,
        name: "Men",
        slug: "men",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
    ],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    inStock: false,
    quantity: 0,
    creationAt: "2026-01-26T12:08:48.000Z",
    updatedAt: "2026-01-26T12:08:48.000Z",
  },
  {
    id: 129,
    title: "Automatic Coffee Maker",
    slug: "automatic-coffee-maker",
    price: 4599,
    description:
      "Compact drip coffee maker with reusable filter and keep-warm function. Brews up to 6 cups at once.",
    categories: [
      {
        id: 15,
        name: "Kitchen Appliances",
        slug: "kitchen-appliances",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        id: 6,
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
    ],
    images: ["https://images.unsplash.com/photo-1637029765108-b2eec167fc83"],
    inStock: true,
    quantity: 20,
    creationAt: "2026-01-26T12:08:49.000Z",
    updatedAt: "2026-01-26T12:08:49.000Z",
  },
  {
    id: 130,
    title: "Abstract Canvas Wall Art",
    slug: "abstract-canvas-wall-art",
    price: 2199,
    description:
      "Large framed abstract canvas print in neutral tones. Adds a modern touch to living rooms or offices.",
    categories: [
      {
        id: 10,
        name: "Home Decor",
        slug: "home-decor",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
    ],
    images: ["https://images.unsplash.com/photo-1615184697985-c9bde1b07da7"],
    inStock: false,
    quantity: 0,
    creationAt: "2026-01-26T12:08:50.000Z",
    updatedAt: "2026-01-26T12:08:50.000Z",
  },
];

export default products;
