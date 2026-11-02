import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-saffron to-orange-600 text-ink rounded-2xl p-10 text-center mb-8">
        <h1 className="text-3xl font-bold">Find your aura.</h1>
        <p className="mt-2 text-ink/80">Hand-picked by Aftab, made to be noticed.</p>
        <Link to="/products" className="inline-block mt-5 bg-surface text-saffron font-semibold rounded-lg px-5 py-2 hover:bg-ink">
          Browse all products
        </Link>
      </section>
      <h2 className="text-xl font-bold mb-4">Featured products</h2>
      <ProductGrid products={products.slice(0, 4)} />
    </>
  );
}
