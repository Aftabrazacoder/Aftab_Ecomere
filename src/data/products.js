export const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, category: "Electronics", image: "🎧", description: "Over-ear Bluetooth headphones with 30-hour battery life." },
  { id: 2, name: "Smart Watch", price: 89.5, category: "Electronics", image: "⌚", description: "Track steps, heart rate and notifications on your wrist." },
  { id: 3, name: "Running Shoes", price: 74.0, category: "Fashion", image: "👟", description: "Lightweight, breathable shoes for daily runs." },
  { id: 4, name: "Backpack", price: 39.99, category: "Fashion", image: "🎒", description: "Water-resistant backpack with laptop compartment." },
  { id: 5, name: "Coffee Maker", price: 49.0, category: "Home", image: "☕", description: "Brew fresh coffee at home in minutes." },
  { id: 6, name: "Desk Lamp", price: 24.99, category: "Home", image: "💡", description: "Adjustable LED lamp with three brightness levels." },
  { id: 7, name: "Gaming Mouse", price: 29.99, category: "Electronics", image: "🖱️", description: "Ergonomic mouse with programmable buttons." },
  { id: 8, name: "Sunglasses", price: 19.99, category: "Fashion", image: "🕶️", description: "UV400 protection with a classic frame." },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];
