import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) return <p className="text-muted">No products found.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
