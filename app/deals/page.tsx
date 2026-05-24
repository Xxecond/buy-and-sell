"use client";

import { Star, Heart } from "lucide-react";
import { useState } from "react";

const deals = [
  { name: "Modern Sofa Chair", price: "₦150,000", oldPrice: "₦200,000", discount: "25%", rating: 4.6, reviews: 230 },
  { name: "Bluetooth Speaker", price: "₦45,000", oldPrice: "₦90,000", discount: "50%", rating: 4.7, reviews: 120 },
  { name: "Double Door Fridge", price: "₦320,000", oldPrice: "₦450,000", discount: "29%", rating: 4.8, reviews: 85 },
  { name: "Front Load Washer", price: "₦210,000", oldPrice: "₦300,000", discount: "30%", rating: 4.6, reviews: 95 },
  { name: "iPhone 15", price: "₦850,000", oldPrice: "₦1,000,000", discount: "15%", rating: 4.9, reviews: 540 },
  { name: "Gaming Laptop", price: "₦480,000", oldPrice: "₦600,000", discount: "20%", rating: 4.7, reviews: 210 },
];

export default function DealsPage() {
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Today's Deals</h1>
      <p className="text-sm text-gray-400 mb-5">Limited time offers — grab them fast!</p>
      <div className="grid grid-cols-2 gap-3">
        {deals.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative bg-gray-100 h-36 flex items-center justify-center">
              <span className="text-4xl">🛍️</span>
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{p.discount}
              </span>
              <button
                onClick={() => setLiked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                className="absolute top-2 right-2"
              >
                <Heart size={18} className={liked.includes(i) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 leading-tight mb-1">{p.name}</p>
              <p className="text-base font-bold text-gray-900">{p.price}</p>
              <p className="text-xs text-gray-400 line-through mb-1">{p.oldPrice}</p>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">{p.rating} ({p.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
