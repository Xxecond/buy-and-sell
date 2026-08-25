"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ChevronRight, Search, RefreshCw } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

type Order = {
  _id: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  items: { name: string; quantity: number }[];
};

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/orders", { withCredentials: true });
      setOrders(res.data?.orders ?? res.data ?? []);
    } catch {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter((o) => {
    const matchFilter = activeFilter === "All" || o.status.toLowerCase() === activeFilter.toLowerCase();
    const matchSearch =
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const firstProduct = (order: Order) => {
    if (!order.items?.length) return "No items";
    const first = order.items[0].name;
    return order.items.length > 1 ? `${first} + ${order.items.length - 1} more` : first;
  };

  const totalItems = (order: Order) => order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <div className="px-4 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">My Orders</h1>
          <p className="text-gray-500 text-sm">Track and manage all your orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                activeFilter === f ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <p className="text-red-500 font-medium mb-3">{error}</p>
          <button onClick={fetchOrders} className="text-emerald-700 text-sm hover:underline">Try Again</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <Package size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium mb-1">
            {orders.length === 0 ? "No orders yet" : "No orders match your search"}
          </p>
          {orders.length === 0 && (
            <Link href="/products" className="text-emerald-700 text-sm hover:underline">
              Start Shopping
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Package size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{firstProduct(order)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()} · {totalItems(order)} item(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-gray-900">₦{order.totalAmount?.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
              {/* Mobile status */}
              <div className="flex items-center justify-between mt-3 sm:hidden">
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                  {order.status}
                </span>
                <p className="font-bold text-gray-900">₦{order.totalAmount?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
