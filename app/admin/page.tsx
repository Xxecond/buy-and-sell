"use client";

import { useEffect, useState } from "react";
import { Users, Store, Package, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { getAdminStats, getAdminSellerRequests } from "@/lib/auth";
import api from "@/lib/api";

type Stats = {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingSellerRequests: number;
};

type Order = { _id: string; status: string; totalAmount: number; createdAt: string; buyer?: { name: string } };
type SellerRequest = { _id: string; status: string; createdAt: string; user?: { name: string }; businessName: string };

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentRequests, setRecentRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getAdminStats(),
      getAdminSellerRequests(),
      api.get("/api/admin/orders", { withCredentials: true }),
    ]).then(([statsRes, requestsRes, ordersRes]) => {
      if (statsRes.status === "fulfilled") setStats(statsRes.value);
      if (requestsRes.status === "fulfilled") setRecentRequests((requestsRes.value ?? []).slice(0, 5));
      if (ordersRes.status === "fulfilled") setRecentOrders((ordersRes.value.data?.orders ?? ordersRes.value.data ?? []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { icon: Users, label: "Total Users", value: stats?.totalUsers ?? "—", color: "bg-blue-100 text-blue-700" },
    { icon: Store, label: "Total Sellers", value: stats?.totalSellers ?? "—", color: "bg-purple-100 text-purple-700" },
    { icon: Package, label: "Total Products", value: stats?.totalProducts ?? "—", color: "bg-orange-100 text-orange-700" },
    { icon: ShoppingBag, label: "Total Orders", value: stats?.totalOrders ?? "—", color: "bg-emerald-100 text-emerald-700" },
    { icon: TrendingUp, label: "Total Revenue", value: stats?.totalRevenue ? `₦${stats.totalRevenue.toLocaleString()}` : "—", color: "bg-green-100 text-green-700" },
    { icon: Clock, label: "Pending Requests", value: stats?.pendingSellerRequests ?? "—", color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statCards.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Orders</h2>
              </div>
              {recentOrders.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">No orders yet</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentOrders.map((o) => (
                    <div key={o._id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">#{o._id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-400">{o.buyer?.name ?? "—"} · {new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₦{o.totalAmount?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          o.status === "delivered" ? "bg-green-100 text-green-700" :
                          o.status === "shipped" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Seller Requests */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Seller Applications</h2>
              </div>
              {recentRequests.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">No applications yet</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentRequests.map((r) => (
                    <div key={r._id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{r.businessName}</p>
                        <p className="text-xs text-gray-400">{r.user?.name ?? "—"} · {new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-600"
                      }`}>{r.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
