import Link from "next/link";
import { MessageCircle, Mail, Phone, FileText, ChevronRight } from "lucide-react";

const options = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Chat with a support agent right now. Available Mon–Fri, 9am–6pm.",
    action: "Start Chat",
    href: "#",
    color: "bg-emerald-700",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us an email and we'll respond within 24 hours.",
    action: "Send Email",
    href: "/contact",
    color: "bg-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Call us directly at +234 800 000 0000 during business hours.",
    action: "Call Now",
    href: "tel:+2348000000000",
    color: "bg-purple-600",
  },
  {
    icon: FileText,
    title: "Help Center",
    desc: "Browse our FAQs and guides to find answers quickly.",
    action: "Browse Articles",
    href: "/help",
    color: "bg-orange-500",
  },
];

const recentTickets = [
  { id: "TKT-001", subject: "Order not delivered", status: "Open", date: "2024-01-15" },
  { id: "TKT-002", subject: "Refund request for ORD-003", status: "Resolved", date: "2024-01-08" },
];

const statusColors: Record<string, string> = {
  Open: "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function SupportPage() {
  return (
    <div className="px-4 lg:px-20 py-6">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Customer Support</h1>
        <p className="text-gray-600">We're here to help. Choose how you'd like to reach us.</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {options.map(({ icon: Icon, title, desc, action, href, color }) => (
          <div key={title} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-500 text-sm flex-1 mb-4">{desc}</p>
            <Link
              href={href}
              className={`text-center py-2 ${color} text-white rounded-xl text-sm font-semibold hover:opacity-90 transition`}
            >
              {action}
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Support Tickets</h2>
          <Link href="/dashboard" className="text-sm text-emerald-700 hover:underline">View All</Link>
        </div>
        {recentTickets.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">No tickets yet</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{ticket.id}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{ticket.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-gray-400">{ticket.date}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Business Hours */}
      <div className="bg-emerald-50 rounded-2xl p-6 lg:p-8">
        <h3 className="font-bold text-gray-900 mb-4">Business Hours</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ["Monday – Friday", "9:00 AM – 6:00 PM WAT"],
            ["Saturday", "10:00 AM – 4:00 PM WAT"],
            ["Sunday", "Closed"],
            ["Public Holidays", "Closed"],
          ].map(([day, hours]) => (
            <div key={day} className="flex justify-between bg-white rounded-xl px-4 py-3">
              <span className="text-gray-600">{day}</span>
              <span className="font-semibold text-gray-900">{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
