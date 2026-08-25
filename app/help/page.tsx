import Link from "next/link";
import { Search, Package, CreditCard, Truck, RefreshCw, Shield, MessageCircle, ChevronRight } from "lucide-react";

const categories = [
  { icon: Package, label: "Orders", desc: "Track, cancel or modify orders", href: "/help/orders" },
  { icon: Truck, label: "Shipping & Delivery", desc: "Delivery times, tracking & fees", href: "/help/shipping" },
  { icon: RefreshCw, label: "Returns & Refunds", desc: "How to return items and get refunds", href: "/help/returns" },
  { icon: CreditCard, label: "Payments", desc: "Payment methods, billing & invoices", href: "/help/payments" },
  { icon: Shield, label: "Account & Security", desc: "Login, password & account settings", href: "/help/account" },
  { icon: MessageCircle, label: "Contact Support", desc: "Get in touch with our team", href: "/contact" },
];

const faqs = [
  {
    q: "How do I track my order?",
    a: "Go to My Orders in your dashboard. Each order has a tracking number you can use to follow your delivery in real time.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Initiate a return from your Orders page.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–7 business days. Express delivery (1–2 days) is available at checkout for eligible locations.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "You can cancel or modify your order within 1 hour of placing it. After that, the order may already be processing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept debit/credit cards (Visa, Mastercard), bank transfers, and mobile money. All transactions are secured with SSL encryption.",
  },
  {
    q: "How do I become a seller on Shoply?",
    a: "Sign up for a seller account from the Sign Up page and select 'Sell on Shoply'. Our team will review your application within 48 hours.",
  },
];

export default function HelpPage() {
  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
        <p className="text-gray-600 mb-6">Find answers to common questions or get in touch with our support team.</p>
        <div className="relative max-w-lg mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {categories.map(({ icon: Icon, label, desc, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition group flex flex-col gap-3"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition">
              <Icon size={18} className="text-emerald-700" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400 mt-auto self-end" />
          </Link>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">{q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Still need help?</h3>
        <p className="text-gray-600 mb-6 text-sm">Our support team is available Monday to Friday, 9am – 6pm WAT.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition"
          >
            Contact Us
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-2.5 border border-emerald-700 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition"
          >
            Sign In for Faster Support
          </Link>
        </div>
      </div>
    </div>
  );
}
