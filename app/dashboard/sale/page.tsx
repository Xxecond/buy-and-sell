"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Clock, Flame } from "lucide-react";

const saleProducts = [
  {
    id: 1,
    name: "Premium Leather Shoes",
    price: 15000,
    originalPrice: 25000,
    discount: 40,
    image: "/assets/bncPic.JPG",
    rating: 4.8,
    reviews: 156,
    category: "Shoes",
    timeLeft: "2 days left"
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    price: 8500,
    originalPrice: 15000,
    discount: 43,
    image: "/assets/bncPic.JPG",
    rating: 4.6,
    reviews: 89,
    category: "Electronics",
    timeLeft: "5 hours left"
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 22000,
    originalPrice: 35000,
    discount: 37,
    image: "/assets/bncPic.JPG",
    rating: 4.9,
    reviews: 234,
    category: "Accessories",
    timeLeft: "1 day left"
  },
  {
    id: 4,
    name: "Smart Phone Case",
    price: 3500,
    originalPrice: 7000,
    discount: 50,
    image: "/assets/bncPic.JPG",
    rating: 4.4,
    reviews: 67,
    category: "Electronics",
    timeLeft: "3 days left"
  },
  {
    id: 5,
    name: "Cotton Summer Dress",
    price: 12000,
    originalPrice: 18000,
    discount: 33,
    image: "/assets/bncPic.JPG",
    rating: 4.7,
    reviews: 145,
    category: "Clothing",
    timeLeft: "6 hours left"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 18000,
    originalPrice: 30000,
    discount: 40,
    image: "/assets/bncPic.JPG",
    rating: 4.5,
    reviews: 98,
    category: "Electronics",
    timeLeft: "4 days left"
  }
];

const categories = ["All", "Clothing", "Electronics", "Accessories", "Shoes", "Home"];
const discountRanges = ["All Discounts", "Up to 25%", "25% - 50%", "50% and above"];

export default function SalePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiscount, setSelectedDiscount] = useState("All Discounts");

  const filteredProducts = saleProducts.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    
    let discountMatch = true;
    if (selectedDiscount === "Up to 25%") {
      discountMatch = product.discount <= 25;
    } else if (selectedDiscount === "25% - 50%") {
      discountMatch = product.discount > 25 && product.discount <= 50;
    } else if (selectedDiscount === "50% and above") {
      discountMatch = product.discount > 50;
    }
    
    return categoryMatch && discountMatch;
  });

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="text-red-500" size={32} />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Hot Sale</h1>
        </div>
        <p className="text-gray-600">Limited time offers - Save up to 70% on selected items</p>
      </div>

      {/* Sale Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 lg:p-8 text-white mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Flash Sale Event</h2>
            <p className="text-red-100 mb-4">Up to 70% off on thousands of products</p>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} />
              <span>Sale ends in: 2 days 14 hours 32 minutes</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="text-right">
              <p className="text-red-100 text-sm">Save up to</p>
              <p className="text-4xl font-bold">70%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
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
          </div>

          {/* Discount Ranges */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Discount Range</h3>
            <div className="flex flex-wrap gap-2">
              {discountRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedDiscount(range)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    selectedDiscount === range
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} products on sale
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                -{product.discount}%
              </div>
              
              {/* Time Left Badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {product.timeLeft}
              </div>
              
              {/* Wishlist Button */}
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                <Heart size={16} className="text-gray-600 hover:text-red-500 transition" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base line-clamp-2 mb-2">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Savings */}
              <div className="text-xs text-green-600 font-medium mb-3">
                You save ₦{(product.originalPrice - product.price).toLocaleString()}
              </div>

              {/* Add to Cart Button */}
              <Link
                href={`/product/${product.id}`}
                className="block w-full text-center py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-red-500 text-red-500 rounded-xl font-medium hover:bg-red-50 transition">
          Load More Sale Items
        </button>
      </div>

      {/* Sale Newsletter */}
      <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 mt-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Never Miss a Sale</h3>
        <p className="text-gray-600 mb-4">Subscribe to get notified about flash sales and exclusive discounts</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}