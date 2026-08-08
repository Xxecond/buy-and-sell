"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";

const initialCart = [
  { id: 1, name: "Classic White Oversized T-Shirt", price: 8500, qty: 1, size: "M", color: "White" },
  { id: 2, name: "Slim Fit Black Jeans", price: 15000, qty: 2, size: "L", color: "Black" },
  { id: 3, name: "Urban Street Hoodie (Grey)", price: 18500, qty: 1, size: "L", color: "Grey" },
];

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}

function CartContent() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const remove = (id: number) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 20000 ? 0 : 2000;
  const total = subtotal + shipping;

  return (
    <div className="px-4 lg:px-20 py-6">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <span className="text-6xl">🛒</span>
          <p className="text-gray-400 text-sm">Your cart is empty</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  👕
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Size: {item.size} • Color: {item.color}</p>
                  <p className="font-bold text-gray-900">₦{(item.price * item.qty).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center hover:bg-emerald-800 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => remove(item.id)} className="p-2 hover:bg-red-50 rounded-xl transition">
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
                  {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Free shipping on orders over ₦20,000
                </p>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full mb-3">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}