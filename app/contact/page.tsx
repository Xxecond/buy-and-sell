"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@shoply.com", href: "mailto:support@shoply.com" },
  { icon: Phone, label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
  { icon: MapPin, label: "Address", value: "123 Commerce Street, Lagos, Nigeria", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon - Fri: 9am - 6pm WAT", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question or need help? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-emerald-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-gray-800 text-sm font-medium mt-0.5">{value}</p>
              </div>
            </a>
          ))}

          {/* Live Chat */}
          <div className="bg-emerald-700 rounded-2xl p-5 text-white">
            <MessageCircle size={24} className="mb-3" />
            <h3 className="font-bold mb-1">Live Chat</h3>
            <p className="text-emerald-100 text-sm mb-3">Chat with our support team in real time.</p>
            <button className="bg-white text-emerald-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-emerald-50 transition">
              Start Chat
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Send size={28} className="text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 px-6 py-2 border border-emerald-700 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-50 transition"
              >
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Andrews Ampadu"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more about your issue or question..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
