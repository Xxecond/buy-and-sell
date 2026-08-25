"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Filter, Grid, List } from "lucide-react";

const newProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 8500,
    originalPrice: 12000,
    image: "/assets/bncPic.JPG",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    category: "Clothing"
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    price: 25000,
    originalPrice: 35000,
    image: "/assets/bncPic.JPG",
    rating: 4.6,
    reviews: 89,
    isNew: true,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Designer Leather Wallet",
    price: 15000,
    originalPrice: 20000,
    image: "/assets/bncPic.JPG",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    category: "Accessories"
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 45000,
    originalPrice: 60000,
    image: "/assets/bncPic.JPG",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    category: "Electronics"
  },
  {
    id: 5,
    name: "Casual Denim Jacket",
    price: 18000,
    originalPrice: 25000,
    image: "/assets/bncPic.JPG",
    rating: 4.5,
    reviews: 92,
    isNew: true,
    category: "Clothing"
  },
  {
    id: 6,
    name: "Minimalist Backpack",
    price: 12000,
    originalPrice: 16000,
    image: "/assets/bncPic.JPG",
    rating: 4.8,
    reviews: 78,
    isNew: true,
    category: "Accessories"
  }
];

const categories = ["All", "Clothing", "Electronics", "Accessories", "Shoes", "Home"];
const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low", "Most Popular"];

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = newProducts.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">New Arrivals</h1>
        <p className="text-gray-600">Discover the latest products just added to our collection</p>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Grid size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <List size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {newProducts.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1"
      }`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group ${
            viewMode === "list" ? "flex gap-4 p-4" : ""
          }`}>
            {/* Product Image */}
            <div className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square"}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-emerald-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                  NEW
                </span>
              )}
              <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                <Heart size={16} className="text-gray-600 hover:text-red-500 transition" />
              </button>
            </div>

            {/* Product Info */}
            <div className={`${viewMode === "list" ? "flex-1" : "p-4"}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base line-clamp-2">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Link
                href={`/product/${product.id}`}
                className="block w-full text-center py-2 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-emerald-700 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition">
          Load More Products
        </button>
      </div>
    </div>
  );
}