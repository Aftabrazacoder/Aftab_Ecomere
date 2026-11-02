import { categories } from "../data/products";

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-1.5 rounded-full text-sm border ${
            active === c ? "bg-saffron text-ink border-saffron" : "bg-surface hover:bg-surface2"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
