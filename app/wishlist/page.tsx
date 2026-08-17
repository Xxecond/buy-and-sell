"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/wishlistContext";
import { useCart } from "@/contexts/cartContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="px-4 lg:px-20 py-6">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <Heart size={56} className="text-gray-200" />
          <p className="text-gray-400 text-sm">Your wishlist is empty</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative bg-gray-100 h-36 lg:h-48 flex items-center justify-center">
                <span className="text-4xl">👕</span>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 leading-tight mb-1">{item.name}</p>
                <p className="text-base font-bold text-gray-900 mb-3">₦{item.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white text-sm font-medium py-2 rounded-xl hover:bg-emerald-800 transition"
                >
                  <ShoppingCart size={15} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
