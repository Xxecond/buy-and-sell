"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, TrendingUp, ShoppingBag, Star, Plus, Eye, Edit, Trash2, AlertCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/authContext";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
};

type Stats = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  rating: number;
};

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <SellerDashboardContent />
    </ProtectedRoute>
  );
}

function SellerDashboardContent() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({ totalSales: 0, totalOrders: 0, totalProducts: 0, rating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, statsRes] = await Promise.allSettled([
          api.get("/api/seller/products", { withCredentials: true }),
          api.get("/api/seller/stats", { withCredentials: true }),
        ]);
        if (productsRes.status === "fulfilled") setProducts(productsRes.value.data?.products ?? productsRes.value.data ?? []);
        if (statsRes.status === "fulfilled") setStats(statsRes.value.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Not a seller
  if (user?.role !== "seller" && user?.role !== "admin") {
    return (
      <div className="px-4 lg:px-20 py-6 max-w-xl mx-auto text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <AlertCircle size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Seller Access Required</h2>
          <p className="text-gray-600 mb-6 text-sm">You need an approved seller account to access this page.</p>
          <Link
            href="/seller-request"
            className="inline-block px-6 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition"
          >
            Apply to Become a Seller
          </Link>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: TrendingUp, label: "Total Sales", value: `₦${stats.totalSales?.toLocaleString() ?? 0}`, color: "bg-emerald-100 text-emerald-700" },
    { icon: ShoppingBag, label: "Total Orders", value: stats.totalOrders ?? 0, color: "bg-blue-100 text-blue-700" },
    { icon: Package, label: "Products Listed", value: stats.totalProducts ?? products.length, color: "bg-purple-100 text-purple-700" },
    { icon: Star, label: "Avg. Rating", value: stats.rating ? `${stats.rating}/5` : "N/A", color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-emerald-700 transition">My Account</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-800 font-medium">Seller Dashboard</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name?.split(" ")[0]} 👋</p>
        </div>
        <Link
          href="/seller/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Products</h2>
          <Link href="/seller/products" className="text-sm text-emerald-700 hover:underline">View All</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Package size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium mb-1">No products yet</p>
            <Link href="/seller/products/new" className="text-emerald-700 text-sm hover:underline">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₦{product.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock === 0 ? "text-red-500" : product.stock < 5 ? "text-yellow-600" : "text-gray-700"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {product.status ?? "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/product/${product._id}`} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Eye size={15} className="text-gray-500" />
                        </Link>
                        <Link href={`/seller/products/${product._id}/edit`} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Edit size={15} className="text-gray-500" />
                        </Link>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition">
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

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Add Product", href: "/seller/products/new", icon: Plus },
          { label: "Manage Products", href: "/seller/products", icon: Package },
          { label: "Seller Orders", href: "/seller/orders", icon: ShoppingBag },
          { label: "Store Profile", href: "/seller/store", icon: Star },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
              <Icon size={16} className="text-emerald-700" />
            </div>
            <span className="text-sm font-medium text-gray-800">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
