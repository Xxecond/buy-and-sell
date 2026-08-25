"use client";

import { useEffect, useState } from "react";
import { Search, Eye, UserX } from "lucide-react";
import api from "@/lib/api";

type Seller = {
  _id: string;
  name: string;
  email: string;
  status?: string;
  createdAt: string;
  sellerRequest?: { businessName: string; businessType: string };
  _count?: { products: number; orders: number };
};

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/admin/sellers", { withCredentials: true })
      .then((res) => setSellers(res.data?.sellers ?? res.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSuspend = async (id: string) => {
    try {
      await api.patch(`/api/admin/sellers/${id}/suspend`, {}, { withCredentials: true });
      setSellers((prev) => prev.map((s) => s._id === id ? { ...s, status: s.status === "suspended" ? "active" : "suspended" } : s));
    } catch { /* ignore */ }
  };

  const filtered = sellers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.sellerRequest?.businessName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sellers</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sellers..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No sellers found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Seller", "Store", "Email", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                    <td className="px-6 py-4 text-gray-600">{s.sellerRequest?.businessName ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-500">{s.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "suspended" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                      }`}>{s.status === "suspended" ? "Suspended" : "Active"}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Eye size={15} className="text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleSuspend(s._id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition"
                        >
                          <UserX size={13} />
                          {s.status === "suspended" ? "Unsuspend" : "Suspend"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
