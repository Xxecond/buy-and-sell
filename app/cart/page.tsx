"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const initialCart = [
  { name: "Modern Sofa Chair", price: 150000, qty: 1 },
  { name: "Bluetooth Speaker", price: 45000, qty: 2 },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (i: number, delta: number) => {
    setCart((prev) =>
      prev.map((item, idx) =>
        idx === i ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const remove = (i: number) => setCart((prev) => prev.filter((_, idx) => idx !== i));

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-5">My Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <span className="text-6xl">🛒</span>
          <p className="text-gray-400 text-sm">Your cart is empty</p>
          <Link href="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-6">
            {cart.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl">🛍️</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <p className="font-bold text-gray-900 text-sm mt-1">₦{(item.price * item.qty).toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQty(i, -1)} className="w-7 h-7 bg-gray-100 rounded-full text-gray-700 font-bold flex items-center justify-center">-</button>
                    <span className="text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(i, 1)} className="w-7 h-7 bg-indigo-600 rounded-full text-white font-bold flex items-center justify-center">+</button>
                  </div>
                </div>
                <button onClick={() => remove(i)}>
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-3">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-base">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
