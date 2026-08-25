"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Trash2, EyeOff } from "lucide-react";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  seller?: { name: string; sellerRequest?: { businessName: string } };
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/admin/products", { withCredentials: true })
      .then((res) => setProducts(res.data?.products ?? res.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string, currentStatus: string) => {
    setActionId(id);
    try {
      await api.patch(`/api/admin/products/${id}/toggle`, {}, { withCredentials: true });
      setProducts((prev) => prev.map((p) => p._id === id ? { ...p, status: currentStatus === "active" ? "disabled" : "active" } : p));
    } catch { /* ignore */ }
    setActionId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setActionId(id);
    try {
      await api.delete(`/api/admin/products/${id}`, { withCredentials: true });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch { /* ignore */ }
    setActionId(null);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.seller?.sellerRequest?.businessName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
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
          <p className="text-center text-gray-400 py-16">No products found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Product", "Seller", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 text-gray-500">{p.seller?.sellerRequest?.businessName ?? p.seller?.name ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-500 capitalize">{p.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₦{p.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={p.stock === 0 ? "text-red-500 font-medium" : p.stock < 5 ? "text-yellow-600 font-medium" : "text-gray-700"}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>{p.status ?? "active"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Eye size={15} className="text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleToggle(p._id, p.status)}
                          disabled={actionId === p._id}
                          className="p-1.5 hover:bg-yellow-50 rounded-lg transition disabled:opacity-50"
                          title={p.status === "active" ? "Disable" : "Enable"}
                        >
                          <EyeOff size={15} className="text-yellow-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={actionId === p._id}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        >
                          <Trash2 size={15} className="text-red-400" />
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
