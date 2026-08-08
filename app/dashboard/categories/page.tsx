"use client";

import Link from "next/link";

const categories = [
  { label: "Furniture", emoji: "🛋️", count: 120 },
  { label: "Speakers", emoji: "🔊", count: 45 },
  { label: "Fridges", emoji: "🧊", count: 60 },
  { label: "Washing Machines", emoji: "🫧", count: 38 },
  { label: "Cars", emoji: "🚗", count: 200 },
  { label: "Phones", emoji: "📱", count: 310 },
  { label: "Laptops", emoji: "💻", count: 95 },
  { label: "Fashion", emoji: "👕", count: 450 },
];

export default function CategoriesPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-5">All Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={`/categories/${cat.label.toLowerCase().replace(" ", "-")}`}
            className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-3xl">
              {cat.emoji}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{cat.label}</p>
              <p className="text-xs text-gray-400">{cat.count} items</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
