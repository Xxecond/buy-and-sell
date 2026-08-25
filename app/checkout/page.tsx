"use client";

import { useState } from "react";
import { CreditCard, Smartphone, MapPin, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useCart } from "@/contexts/cartContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}

function CheckoutContent() {
  const { cart, cartCount } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState({ fullName: "", phone: "", address: "", city: "", state: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 2000;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.phone || !address.address || !address.city || !address.state) {
      setError("Please fill in all delivery address fields.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/orders", {
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        deliveryAddress: address,
        paymentMethod,
        totalAmount: total,
        shippingFee: shipping,
      }, { withCredentials: true });

      setSuccess(true);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string; error?: string } } };
      setError(e.response?.data?.message ?? e.response?.data?.error ?? "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-600 mb-8 max-w-sm">
          Your order has been placed successfully. You can track it from your orders page.
        </p>
        <div className="flex gap-3">
          <Link href="/orders">
            <Button variant="special">Track Order</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link href="/products"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-20 py-6">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Address + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-emerald-700" />
              <h2 className="text-lg font-bold text-gray-800">Delivery Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={address.fullName}
                onChange={(e) => setAddress(p => ({ ...p, fullName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700 text-sm" />
              <input type="tel" placeholder="Phone Number" value={address.phone}
                onChange={(e) => setAddress(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700 text-sm" />
              <input type="text" placeholder="Street Address" value={address.address}
                onChange={(e) => setAddress(p => ({ ...p, address: e.target.value }))}
                className="md:col-span-2 w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700 text-sm" />
              <input type="text" placeholder="City" value={address.city}
                onChange={(e) => setAddress(p => ({ ...p, city: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700 text-sm" />
              <select value={address.state} onChange={(e) => setAddress(p => ({ ...p, state: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-700 text-sm">
                <option value="">Select State</option>
                {["Lagos","Abuja","Kano","Rivers","Oyo","Kaduna","Enugu","Delta","Anambra","Imo"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
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
              {[
                { value: "card", icon: CreditCard, label: "Credit / Debit Card" },
                { value: "mobile", icon: Smartphone, label: "Mobile Money (MTN, Airtel)" },
                { value: "transfer", icon: Building2, label: "Bank Transfer" },
              ].map(({ value, icon: Icon, label }) => (
                <label key={value} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="payment" value={value}
                    checked={paymentMethod === value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-emerald-700" />
                  <Icon size={20} className="text-gray-600" />
                  <span className="font-medium text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary ({cartCount} items)</h2>

          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">👕</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold shrink-0">₦{(item.price * item.quantity).toLocaleString()}</p>
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
              <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
                {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}
              </span>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <Button onClick={handlePlaceOrder} disabled={loading} size="lg" variant="special" className="w-full mb-3">
            {loading ? "Placing Order..." : "Place Orderrr"}
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
