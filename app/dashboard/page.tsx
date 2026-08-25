"use client";

import { useState, useEffect } from "react";
import { Package, User, Heart, MapPin, CreditCard, Headphones, Store, Clock, CheckCircle, XCircle, Shield } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getSellerRequest } from "@/lib/auth";
import api from "@/lib/api";

type Order = { _id: string; createdAt: string; status: string; totalAmount: number; items: { quantity: number }[] };
type SellerRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | null;

const quickActions = [
  { icon: Package, label: "My Orders", href: "/orders", desc: "Track your orders" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", desc: "Saved items" },
  { icon: MapPin, label: "Addresses", href: "/profile/addresses", desc: "Manage delivery addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/profile/payments", desc: "Saved cards & methods" },
  { icon: User, label: "Profile Settings", href: "/profile", desc: "Update your information" },
  { icon: Headphones, label: "Support", href: "/support", desc: "Get help" },
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "User";
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerStatus, setSellerStatus] = useState<SellerRequestStatus>(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    api.get("/api/orders", { withCredentials: true })
      .then(res => setOrders((res.data?.orders ?? res.data ?? []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));

    if (user?.role !== "seller") {
      getSellerRequest().then(data => setSellerStatus(data?.status ?? null));
    }
  }, [user]);

  const totalSpent = orders.reduce((s, o) => s + (o.totalAmount ?? 0), 0);
  const totalItems = orders.reduce((s, o) => s + o.items.reduce((si, i) => si + i.quantity, 0), 0);

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 lg:p-8 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-gray-600">
          Manage your orders, profile, and shopping preferences from your account dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Package, label: "My Orders", href: "/orders", desc: "Track your orders" },
              { icon: Heart, label: "Wishlist", href: "/wishlist", desc: "Saved items" },
              { icon: MapPin, label: "Addresses", href: "/profile/addresses", desc: "Manage delivery addresses" },
              { icon: CreditCard, label: "Payment Methods", href: "/profile/payments", desc: "Saved cards & methods" },
              { icon: User, label: "Profile Settings", href: "/profile", desc: "Update your information" },
              { icon: Headphones, label: "Support", href: "/support", desc: "Get help" },
            ].map(({ icon: Icon, label, href, desc }) => (
              <Link key={href} href={href}
                className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md transition group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition">
                  <Icon size={24} className="text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{label}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </Link>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <Link href="/orders" className="text-sm text-emerald-700 font-medium hover:underline">View All</Link>
            </div>

            {loadingOrders ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No orders yet</p>
                <Link href="/products" className="text-emerald-700 text-sm font-medium hover:underline">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₦{order.totalAmount?.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Account Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-emerald-700">{firstName[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Link href="/profile" className="block w-full text-center py-2 border border-emerald-700 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-50 transition">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Orders</span>
                <span className="font-bold text-gray-800">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Spent</span>
                <span className="font-bold text-gray-800">₦{totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Items Ordered</span>
                <span className="font-bold text-gray-800">{totalItems}</span>
              </div>
            </div>
          </div>

          {/* Seller Center / Admin Panel */}
          {user?.role === "admin" ? (
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={20} className="text-emerald-400" />
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Platform Management</p>
              </div>
              <h3 className="font-bold text-lg mb-1">{user.name}</h3>
              <p className="text-gray-400 text-sm mb-4">You have admin access to the platform.</p>
              <Link href="/admin" className="block w-full text-center py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition">
                Go to Admin Panel
              </Link>
            </div>
          ) : user?.role === "seller" ? (
            <div className="bg-emerald-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Store size={20} />
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Seller Center</p>
              </div>
              <h3 className="font-bold text-lg mb-1">{user.name}</h3>
              <p className="text-emerald-100 text-sm mb-4">Your seller account is active.</p>
              <Link href="/seller/dashboard" className="block w-full text-center py-2.5 bg-white text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition">
                Go to Seller Dashboard
              </Link>
            </div>
          ) : sellerStatus === "PENDING" ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <Clock size={22} className="text-yellow-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Seller Application</h3>
              <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold mb-2">Pending Review</span>
              <p className="text-gray-600 text-sm">Your application is being reviewed. We'll notify you by email.</p>
            </div>
          ) : sellerStatus === "REJECTED" ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <XCircle size={22} className="text-red-500 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Seller Application</h3>
              <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-semibold mb-2">Rejected</span>
              <p className="text-gray-600 text-sm mb-3">Your application was not approved.</p>
              <Link href="/seller-request" className="block w-full text-center py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition">
                Apply Again
              </Link>
            </div>
          ) : sellerStatus === "APPROVED" ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <CheckCircle size={22} className="text-emerald-700 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Seller Application</h3>
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-semibold mb-2">Approved</span>
              <Link href="/seller/dashboard" className="block w-full text-center py-2 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition">
                Go to Seller Dashboard
              </Link>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <Store size={22} className="text-gray-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Become a Seller</h3>
              <p className="text-gray-600 text-sm mb-4">Start selling on Shoply and reach thousands of customers.</p>
              <Link href="/seller-request" className="block w-full text-center py-2 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition">
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}