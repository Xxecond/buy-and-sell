"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Truck, ShieldCheck, Package, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Hero Slider ---
const heroSlides = [
  { title: "Elevate Your Style", subtitle: "Discover premium clothing that defines your unique fashion sense.", bg: "from-emerald-100 to-teal-100", emoji: "👕" },
  { title: "New Season Arrivals", subtitle: "Fresh styles dropping weekly. Stay ahead of the fashion curve.", bg: "from-blue-100 to-indigo-100", emoji: "👗" },
  { title: "Weekend Fashion Sale", subtitle: "Up to 50% off on selected clothing items this weekend only.", bg: "from-amber-100 to-orange-100", emoji: "👟" },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className={`bg-gradient-to-r ${slide.bg} px-6 lg:px-20 py-10 lg:py-20 flex items-center justify-between min-h-[45vh] lg:min-h-[55vh] relative overflow-hidden`}>
      <div className="flex-1 z-10 max-w-lg">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight mb-3">{slide.title}</h1>
        <p className="text-gray-500 text-sm lg:text-base mb-6">{slide.subtitle}</p>
        <Button variant="default" size="lg" asChild>
          <Link href="/categories">Shop Now</Link>
        </Button>
      </div>
      <div className="hidden lg:flex items-center justify-center text-[180px] z-10">
        {slide.emoji}
      </div>
      <div className="w-64 h-64 bg-white/20 rounded-full absolute -right-10 -bottom-10" />
      <div className="flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-1.5">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "bg-emerald-700 w-6" : "bg-gray-300 w-2"}`} />
        ))}
      </div>
    </section>
  );
}

// --- Ads Slider ---
const ads = [
  { tag: "Summer Collection", title: "50% OFF", sub: "On Selected Items", bg: "bg-emerald-700", textColor: "text-white" },
  { tag: "New Arrivals", title: "Fresh Styles", sub: "Latest fashion drops", bg: "bg-slate-50", textColor: "text-gray-800" },
  { tag: "Weekend Sale", title: "Up to 40% OFF", sub: "Limited time offer", bg: "bg-amber-50", textColor: "text-gray-800" },
];

function AdsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % ads.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 lg:px-20 py-6">
      {/* Mobile: single sliding */}
      <div className="lg:hidden overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {ads.map((ad, i) => (
            <div key={i} className={`min-w-full ${ad.bg} ${ad.textColor} p-6 rounded-2xl`}>
              <p className="text-xs font-semibold opacity-70 mb-1">{ad.tag}</p>
              <p className="text-2xl font-bold">{ad.title}</p>
              <p className="text-sm opacity-70 mb-3">{ad.sub}</p>
              <Link href="/sale" className={`text-sm font-semibold border-b border-current pb-0.5`}>Shop Now →</Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {ads.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "bg-emerald-700 w-6" : "bg-gray-300 w-2"}`} />
          ))}
        </div>
      </div>

      {/* Desktop: all 3 side by side */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {ads.map((ad, i) => (
          <div key={i} className={`${ad.bg} ${ad.textColor} p-6 rounded-2xl`}>
            <p className="text-xs font-semibold opacity-70 mb-1">{ad.tag}</p>
            <p className="text-2xl font-bold">{ad.title}</p>
            <p className="text-sm opacity-70 mb-3">{ad.sub}</p>
            <Link href="/sale" className="text-sm font-semibold border-b border-current pb-0.5">Shop Now →</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Categories ---
const categories = [
  { label: "T-Shirts", emoji: "👕" },
  { label: "Hoodies & Sweatshirts", emoji: "🧥" },
  { label: "Jeans & Trousers", emoji: "👖" },
  { label: "Shoes & Sneakers", emoji: "👟" },
  { label: "Watches & Accessories", emoji: "⌚" },
  { label: "Jackets & Coats", emoji: "🧥" },
  { label: "Traditional / Cultural Wear", emoji: "👘" },
  { label: "Underwear & Basics", emoji: "🩲" },
];

function Categories() {
  return (
    <section className="px-4 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Shop by Category</h2>
        <Link href="/categories" className="text-sm text-emerald-700 font-medium hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-6">
        {categories.map((cat) => (
          <Link key={cat.label} href={`/categories/${cat.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 lg:w-20 lg:h-20 bg-emerald-50 rounded-full flex items-center justify-center text-2xl lg:text-3xl group-hover:bg-emerald-100 transition">
              {cat.emoji}
            </div>
            <span className="text-xs lg:text-sm text-gray-600 text-center leading-tight">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// --- Featured Products ---
const products = [
  { name: "Classic White Oversized T-Shirt", price: "₦8,500", rating: 4.6, reviews: 230 },
  { name: "Slim Fit Black Jeans", price: "₦15,000", rating: 4.7, reviews: 120 },
  { name: "AirFlex Running Sneakers", price: "₦25,000", rating: 4.8, reviews: 85 },
  { name: "Minimal Leather Wristwatch", price: "₦35,000", rating: 4.6, reviews: 95 },
  { name: "Urban Street Hoodie (Grey)", price: "₦18,500", rating: 4.9, reviews: 540 },
  { name: "Premium Denim Jacket", price: "₦22,000", rating: 4.7, reviews: 210 },
  { name: "Casual Canvas Sneakers", price: "₦12,500", rating: 4.5, reviews: 180 },
  { name: "Everyday Essentials Pack", price: "₦14,000", rating: 4.8, reviews: 320 },
];

function FeaturedProducts() {
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <section className="px-4 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Featured Products</h2>
        <Link href="/products" className="text-sm text-emerald-700 font-medium hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {products.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative bg-gray-100 h-36 lg:h-48 flex items-center justify-center">
              <span className="text-4xl lg:text-5xl">👕</span>
              <button
                onClick={() => setLiked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <Heart size={16} className={liked.includes(i) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>
            <div className="p-3 lg:p-4">
              <p className="text-sm lg:text-base font-medium text-gray-800 leading-tight mb-1">{p.name}</p>
              <p className="text-base lg:text-lg font-bold text-gray-900 mb-1">{p.price}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{p.rating} ({p.reviews})</span>
                </div>
                <Button size="sm" className="hidden lg:block" variant="default">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Benefits ---
const benefits = [
  { icon: Truck, title: "Free Shipping", desc: "Free delivery on orders over ₦20,000" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure payment methods" },
  { icon: Package, title: "Quality Guarantee", desc: "Premium clothing you can trust" },
];

function Benefits() {
  return (
    <section className="px-4 lg:px-20 py-6">
      <div className="grid grid-cols-3 gap-3 lg:gap-6">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl p-4 lg:p-6 flex flex-col lg:flex-row items-center lg:items-start gap-3 text-center lg:text-left shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
              <Icon size={24} className="text-emerald-700" />
            </div>
            <div>
              <p className="text-sm lg:text-base font-bold text-gray-800 mb-1">{title}</p>
              <p className="text-xs lg:text-sm text-gray-400 leading-tight">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Reviews ---
const reviews = [
  { name: "Adunni K.", rating: 5, text: "Amazing quality clothing! The fit is perfect and delivery was super fast." },
  { name: "Chidi O.", rating: 5, text: "Love the style and quality. Customer service is excellent too!" },
  { name: "Fatima A.", rating: 4.5, text: "Great prices and authentic products. Will definitely shop again!" },
  { name: "Tunde B.", rating: 5, text: "The hoodie I ordered exceeded my expectations. Highly recommend!" },
  { name: "Kemi S.", rating: 4, text: "Good quality clothing at affordable prices. Fast shipping too." },
];

function Reviews() {
  return (
    <section className="px-4 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-800">What Our Customers Say</h2>
        <Link href="/reviews" className="text-sm text-emerald-700 font-medium hover:underline">View All</Link>
      </div>
      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="flex lg:grid lg:grid-cols-5 gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
        {reviews.map((r, i) => (
          <div key={i} className="min-w-[220px] lg:min-w-0 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 shrink-0">
                {r.name[0]}
              </div>
              <p className="text-sm font-semibold text-gray-800">{r.name}</p>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Newsletter ---
function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-4 lg:mx-20 my-6 bg-emerald-700 rounded-2xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Mail size={36} className="text-white shrink-0" />
        <div>
          <p className="text-white font-bold text-base lg:text-xl">Get Style Updates</p>
          <p className="text-emerald-200 text-xs lg:text-sm">Subscribe for exclusive fashion deals and new arrivals!</p>
        </div>
      </div>
      <div className="flex gap-2 w-full lg:w-auto lg:min-w-[400px]">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
        />
        <Button variant="secondary" className="whitespace-nowrap">
          Subscribe
        </Button>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-6 lg:px-20 py-10 mt-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
            <Image 
              src="/assets/logo.JPG" 
              alt="Shoply Logo" 
              width={24} 
              height={24} 
              className="rounded"
            />
            Shoply
          </div>
          <p className="text-xs lg:text-sm mb-4 leading-relaxed">Your destination for premium clothing and the latest fashion trends.</p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <Icon key={i} size={18} className="text-gray-400 hover:text-white transition cursor-pointer" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Categories</p>
          {["T-Shirts", "Hoodies", "Jeans", "Sneakers", "Accessories"].map((l) => (
            <p key={l} className="text-xs lg:text-sm mb-2 hover:text-white cursor-pointer transition">{l}</p>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Customer Care</p>
          {["Size Guide", "Returns", "Shipping Info", "Terms & Conditions", "Privacy Policy"].map((l) => (
            <p key={l} className="text-xs lg:text-sm mb-2 hover:text-white cursor-pointer transition">{l}</p>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          <p className="text-xs lg:text-sm mb-2">📞 +233 531 467 213</p>
          <p className="text-xs lg:text-sm mb-2">✉️ support@shoply.com</p>
          <p className="text-xs lg:text-sm mb-2">📍 Accra, Ghana</p>
        </div>
      </div>
      <p className="text-xs text-center border-t border-gray-700 pt-6"> © {new Date().getFullYear()} Shoply. All rights reserved.</p>
    </footer>
  );
}

// --- Page ---
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeroSlider />
      <AdsSlider />
      <Categories />
      <FeaturedProducts />
      <Benefits />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  );
}