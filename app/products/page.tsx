"use client";

import { useState } from "react";
import { Star, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const allProducts = [
  { id: 1, name: "Classic White Oversized T-Shirt", price: 8500, rating: 4.6, reviews: 230, category: "T-Shirts" },
  { id: 2, name: "Slim Fit Black Jeans", price: 15000, rating: 4.7, reviews: 120, category: "Jeans" },
  { id: 3, name: "AirFlex Running Sneakers", price: 25000, rating: 4.8, reviews: 85, category: "Sneakers" },
  { id: 4, name: "Minimal Leather Wristwatch", price: 35000, rating: 4.6, reviews: 95, category: "Watches" },
  { id: 5, name: "Urban Street Hoodie (Grey)", price: 18500, rating: 4.9, reviews: 540, category: "Hoodies" },
  { id: 6, name: "Premium Denim Jacket", price: 22000, rating: 4.7, reviews: 210, category: "Jackets" },
  { id: 7, name: "Casual Canvas Sneakers", price: 12500, rating: 4.5, reviews: 180, category: "Sneakers" },
  { id: 8, name: "Everyday Essentials Pack", price: 14000, rating: 4.8, reviews: 320, category: "Basics" },
  { id: 9, name: "Black Leather Boots", price: 28000, rating: 4.7, reviews: 156, category: "Shoes" },
  { id: 10, name: "Cotton Polo Shirt", price: 9500, rating: 4.5, reviews: 89, category: "T-Shirts" },
  { id: 11, name: "Vintage Denim Jeans", price: 16500, rating: 4.6, reviews: 203, category: "Jeans" },
  { id: 12, name: "Sports Performance Hoodie", price: 21000, rating: 4.8, reviews: 167, category: "Hoodies" },
];

const categories = ["All", "T-Shirts", "Jeans", "Sneakers", "Hoodies", "Jackets", "Watches", "Shoes", "Basics"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [liked, setLiked] = useState<number[]>([]);

  const filteredProducts = allProducts.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <div className="px-4 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">All Products</h1>
        <p className="text-sm text-gray-500">{sortedProducts.length} items</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-700"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <Link href={`/product/${product.id}`}>
              <div className="relative bg-gray-100 h-40 lg:h-52 flex items-center justify-center">
                <span className="text-4xl lg:text-5xl">👕</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLiked((prev) => prev.includes(product.id) ? prev.filter((x) => x !== product.id) : [...prev, product.id]);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  <Heart size={16} className={liked.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
              </div>
            </Link>
            <div className="p-3 lg:p-4">
              <Link href={`/product/${product.id}`}>
                <p className="text-sm lg:text-base font-medium text-gray-800 leading-tight mb-1 hover:text-emerald-700 transition">
                  {product.name}
                </p>
              </Link>
              <p className="text-base lg:text-lg font-bold text-gray-900 mb-2">₦{product.price.toLocaleString()}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
                </div>
                <Button size="sm" variant="outline" className="hidden lg:block">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}