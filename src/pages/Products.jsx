import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function Products() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All products</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full sm:w-80 border rounded-lg px-3 py-2 mb-4 bg-surface"
      />
      <CategoryFilter active={category} onChange={setCategory} />
      <ProductGrid products={visible} />
    </>
  );
}
