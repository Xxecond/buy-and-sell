"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { getAdminSellerRequests, approveSellerRequest, rejectSellerRequest } from "@/lib/auth";

type SellerRequest = {
  _id: string;
  businessName: string;
  businessType: string;
  phone: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user?: { _id: string; name: string; email: string };
};

export default function AdminSellerRequestsPage() {
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");

  useEffect(() => {
    getAdminSellerRequests().then((data) => setRequests(data ?? [])).finally(() => setLoading(false));
  }, []);

  const handle = async (id: string, action: "approve" | "reject") => {
    setActionId(id);
    try {
      if (action === "approve") await approveSellerRequest(id);
      else await rejectSellerRequest(id);
      setRequests((prev) =>
        prev.map((r) => r._id === id ? { ...r, status: action === "approve" ? "APPROVED" : "REJECTED" } : r)
      );
    } catch { /* ignore */ }
    setActionId(null);
  };

  const filtered = requests.filter((r) => filter === "ALL" || r.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Seller Requests</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
              filter === f ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
            {f === "PENDING" && (
              <span className="ml-1.5 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full">
                {requests.filter((r) => r.status === "PENDING").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Clock size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No {filter === "ALL" ? "" : filter.toLowerCase()} requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{r.businessName}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                      r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-600"
                    }`}>{r.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium text-gray-700">{r.user?.name}</span> · {r.user?.email}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {r.businessType} · {r.phone} · Applied {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  {r.description && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">{r.description}</p>
                  )}
                </div>

                {r.status === "PENDING" && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handle(r._id, "approve")}
                      disabled={actionId === r._id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
                    >
                      <CheckCircle size={15} />
                      Approve
                    </button>
                    <button
                      onClick={() => handle(r._id, "reject")}
                      disabled={actionId === r._id}
                      className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition disabled:opacity-50"
                    >
                      <XCircle size={15} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
