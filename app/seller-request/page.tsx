"use client";

import { useState, useEffect } from "react";
import { Store, Clock, XCircle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { submitSellerRequest, getSellerRequest } from "@/lib/auth";
import { useAuth } from "@/contexts/authContext";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

type SellerRequest = {
  status: RequestStatus;
  businessName: string;
  businessType: string;
  description: string;
  createdAt: string;
};

export default function SellerRequestPage() {
  return (
    <ProtectedRoute>
      <SellerRequestContent />
    </ProtectedRoute>
  );
}

function SellerRequestContent() {
  const { user } = useAuth();
  const [request, setRequest] = useState<SellerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    description: "",
    phone: "",
  });

  useEffect(() => {
    getSellerRequest().then((data) => {
      setRequest(data);
      setLoading(false);
    });
  }, []);

  // Already a seller
  if (user?.role === "seller") {
    return (
      <div className="px-4 lg:px-20 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Seller Account is Active</h2>
          <p className="text-gray-600 mb-6">You have full access to the Seller Center. Start listing products and managing your store.</p>
          <Link
            href="/seller/dashboard"
            className="inline-block px-8 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition"
          >
            Go to Seller Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show status if request already exists
  if (request) {
    return (
      <div className="px-4 lg:px-20 py-6 max-w-2xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {request.status === "PENDING" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock size={28} className="text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Application Under Review</h2>
                <p className="text-gray-500 text-sm">Submitted on {new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 text-sm font-medium">
                Your seller application is being reviewed by our team. This usually takes 1–3 business days.
                We'll notify you by email once a decision has been made.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Business Name</span>
                <span className="font-medium text-gray-900">{request.businessName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Business Type</span>
                <span className="font-medium text-gray-900">{request.businessType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span>
              </div>
            </div>
          </div>
        )}

        {request.status === "REJECTED" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={28} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Application Not Approved</h2>
                <p className="text-gray-500 text-sm">Reviewed on {new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 text-sm">
                Unfortunately your application was not approved at this time. You may apply again with updated information.
              </p>
            </div>
            <button
              onClick={() => setRequest(null)}
              className="w-full py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition"
            >
              Apply Again
            </button>
          </div>
        )}

        {request.status === "APPROVED" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Approved!</h2>
            <p className="text-gray-600 mb-6">Your seller account is now active. Head to your Seller Dashboard to start selling.</p>
            <Link
              href="/seller/dashboard"
              className="inline-block px-8 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition"
            >
              Go to Seller Dashboard
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Application form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitSellerRequest(form);
      const updated = await getSellerRequest();
      setRequest(updated);
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 lg:px-20 py-6 max-w-2xl mx-auto">
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <Store size={28} className="text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Become a Seller</h1>
            <p className="text-gray-500 text-sm">Fill in your business details to apply</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: "🏪", text: "Your own storefront" },
            { emoji: "📦", text: "Manage products" },
            { emoji: "💰", text: "Track earnings" },
          ].map(({ emoji, text }) => (
            <div key={text} className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-xl mb-1">{emoji}</p>
              <p className="text-xs text-emerald-800 font-medium">{text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Andrews Fashion Store"
              value={form.businessName}
              onChange={(e) => setForm(p => ({ ...p, businessName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
            <select
              required
              value={form.businessType}
              onChange={(e) => setForm(p => ({ ...p, businessType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select a category</option>
              {["Clothing & Fashion", "Electronics", "Accessories", "Shoes & Footwear", "Home & Living", "Beauty & Health", "Sports & Fitness", "Other"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your business, what you sell, and why you want to join Shoply..."
              value={form.description}
              onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
