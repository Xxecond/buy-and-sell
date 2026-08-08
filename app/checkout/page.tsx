"use client";

import { useState } from "react";
import { CreditCard, Smartphone, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

const cartItems = [
  { id: 1, name: "Classic White Oversized T-Shirt", price: 8500, qty: 1, size: "M", color: "White" },
  { id: 2, name: "Slim Fit Black Jeans", price: 15000, qty: 2, size: "L", color: "Black" },
];

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}

function CheckoutContent() {
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 2000;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    // Payment processing logic here
    console.log("Order placed:", { deliveryAddress, paymentMethod, items: cartItems, total });
    alert("Order placed successfully!");
  };

  return (
    <div className="px-4 lg:px-20 py-6">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-emerald-700" />
              <h2 className="text-lg font-bold text-gray-800">Delivery Address</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={deliveryAddress.fullName}
                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={deliveryAddress.phone}
                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={deliveryAddress.address}
                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                className="md:col-span-2 w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700"
              />
              <input
                type="text"
                placeholder="City"
                value={deliveryAddress.city}
                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700"
              />
              <select
                value={deliveryAddress.state}
                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700"
              >
                <option value="">Select State</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Rivers">Rivers</option>
                <option value="Oyo">Oyo</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-emerald-700" />
              <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-emerald-700"
                />
                <CreditCard size={20} className="text-gray-600" />
                <span className="font-medium">Credit/Debit Card</span>
              </label>
              
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="mobile"
                  checked={paymentMethod === "mobile"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-emerald-700"
                />
                <Smartphone size={20} className="text-gray-600" />
                <span className="font-medium">Mobile Money (MTN, Airtel)</span>
              </label>
              
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-emerald-700"
                />
                <User size={20} className="text-gray-600" />
                <span className="font-medium">Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
          
          {/* Items */}
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  👕
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-tight">{item.name}</p>
                  <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold">₦{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₦{shipping.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <Button onClick={handlePlaceOrder} size="lg" className="w-full mb-3">
            Place Order
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}