import Image from "next/image";
import Link from "next/link";
import { Shield, Truck, HeadphonesIcon, Award, Users, Globe, Heart, Star } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: "50,000+", icon: Users },
  { label: "Products Sold", value: "200,000+", icon: Award },
  { label: "Countries Served", value: "15+", icon: Globe },
  { label: "Years of Experience", value: "5+", icon: Star }
];

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We prioritize your security with encrypted transactions and verified sellers."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep with real-time tracking."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you with any questions."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond for our customers."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/assets/bncPic.JPG",
    description: "Passionate about creating the best shopping experience for our customers."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/assets/bncPic.JPG",
    description: "Leading our technology team to build innovative e-commerce solutions."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Success",
    image: "/assets/bncPic.JPG",
    description: "Ensuring every customer has an amazing experience with Shoply."
  }
];

export default function AboutPage() {
  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Shoply</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're on a mission to make online shopping simple, secure, and enjoyable for everyone. 
          Since 2019, we've been connecting customers with quality products from trusted sellers worldwide.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon size={24} className="text-emerald-700" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{value}</h3>
            <p className="text-gray-600 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Shoply was born from a simple idea: online shopping should be easy, trustworthy, and accessible to everyone. 
              Our founders, frustrated with complicated checkout processes and unreliable sellers, decided to create a platform 
              that puts customers first.
            </p>
            <p>
              What started as a small marketplace has grown into a thriving community of buyers and sellers. We've helped 
              thousands of businesses reach new customers while providing shoppers with access to quality products at 
              competitive prices.
            </p>
            <p>
              Today, we continue to innovate and improve our platform, always with our customers' needs at the heart of 
              everything we do. From our user-friendly interface to our robust security measures, every feature is designed 
              to make your shopping experience better.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
            <Image
              src="/assets/logo.JPG"
              alt="Shoply Team"
              width={400}
              height={300}
              className="rounded-xl mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and help us create the best possible experience for our customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate people behind Shoply who work every day to make your shopping experience amazing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-emerald-700 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 lg:p-12 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          To democratize commerce by providing a platform where anyone can buy and sell with confidence, 
          connecting communities and creating opportunities for businesses of all sizes to thrive in the digital economy.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Shopping?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust Shoply for their online shopping needs. 
          Discover amazing products from verified sellers today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-3 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800 transition"
          >
            Start Shopping
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-emerald-700 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}