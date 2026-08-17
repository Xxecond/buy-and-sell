"use client";

import { X, Search } from "lucide-react";
import { useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentSearches = ["White T-Shirt", "Black Jeans", "Running Sneakers"];
const popularSearches = ["T-Shirts", "Hoodies", "Jeans", "Sneakers", "Watches", "Jackets"];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <Search size={20} className="text-gray-400" />
        <input
          autoFocus
          type="search"
          placeholder="Search clothing..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-gray-800 "
        />
        <button onClick={onClose}><X size={22} className="text-gray-600" /></button>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button key={s} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <button key={s} className="px-3 py-1.5 bg-emerald-50 rounded-full text-sm text-emerald-700">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}