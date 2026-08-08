"use client";

import { Package, User, Heart, MapPin, CreditCard, Headphones } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const recentOrders = [
  { id: "ORD-001", date: "2024-01-15", status: "Delivered", total: 23500, items: 2 },
  { id: "ORD-002", date: "2024-01-10", status: "Shipped", total: 15000, items: 1 },
  { id: "ORD-003", date: "2024-01-05", status: "Processing", total: 8500, items: 1 },
];

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
            {quickActions.map(({ icon: Icon, label, href, desc }) => (
              <Link
                key={href}
                href={href}
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
              <Link href="/orders" className="text-sm text-emerald-700 font-medium hover:underline">
                View All
              </Link>
            </div>
            
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No orders yet</p>
                <Link href="/products" className="text-emerald-700 text-sm font-medium hover:underline">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date} • {order.items} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₦{order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account Summary */}
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
                <span className="font-bold text-gray-800">{recentOrders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Spent</span>
                <span className="font-bold text-gray-800">
                  ₦{recentOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Wishlist Items</span>
                <span className="font-bold text-gray-800">5</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-emerald-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our customer support team is here to help you with any questions.
            </p>
            <Link href="/support" className="block w-full text-center py-2 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}