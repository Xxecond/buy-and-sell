"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";

const allProducts = [
  { name: "Modern Sofa Chair", price: "₦150,000", rating: 4.6, category: "Furniture" },
  { name: "Bluetooth Speaker", price: "₦45,000", rating: 4.7, category: "Speakers" },
  { name: "Double Door Fridge", price: "₦320,000", rating: 4.8, category: "Fridges" },
  { name: "iPhone 15", price: "₦850,000", rating: 4.9, category: "Phones" },
  { name: "Gaming Laptop", price: "₦480,000", rating: 4.7, category: "Laptops" },
  { name: "Fashion Hoodie", price: "₦25,000", rating: 4.5, category: "Fashion" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = query.length > 1
    ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-6 shadow-sm">
        <Search size={18} className="text-gray-400" />
        <input
          autoFocus
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-gray-800 text-sm"
        />
      </div>

      {query.length > 1 && results.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-10">No results for "{query}"</p>
      )}

      <div className="flex flex-col gap-3">
        {results.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl">🛍️</div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
              <p className="text-xs text-gray-400 mb-1">{p.category}</p>
              <p className="font-bold text-gray-900 text-sm">{p.price}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={11} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-400">{p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
