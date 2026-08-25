"use client";

import { useEffect, useState } from "react";
import { Search, UserX, Trash2 } from "lucide-react";
import { getAdminUsers, suspendUser, deleteUser } from "@/lib/auth";

type User = { _id: string; name: string; email: string; role: string; status?: string; createdAt: string };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    getAdminUsers().then((data) => setUsers(data ?? [])).finally(() => setLoading(false));
  }, []);

  const handleSuspend = async (id: string) => {
    setActionId(id);
    try {
      await suspendUser(id);
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u));
    } catch { /* ignore */ }
    setActionId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    setActionId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch { /* ignore */ }
    setActionId(null);
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
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
          <p className="text-center text-gray-400 py-16">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        u.role === "admin" ? "bg-purple-100 text-purple-700" :
                        u.role === "seller" ? "bg-emerald-100 text-emerald-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === "suspended" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                      }`}>{u.status === "suspended" ? "Suspended" : "Active"}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {u.role !== "admin" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSuspend(u._id)}
                            disabled={actionId === u._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition disabled:opacity-50"
                          >
                            <UserX size={13} />
                            {u.status === "suspended" ? "Unsuspend" : "Suspend"}
                          </button>
                          <button
                            onClick={() => handleDelete(u._id)}
                            disabled={actionId === u._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      )}
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
