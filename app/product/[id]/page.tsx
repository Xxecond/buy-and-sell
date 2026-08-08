"use client";

import { useState, } from "react";
import { Star, Heart, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {CartItem} from "@/lib/type"

// Mock product data - in real app, fetch by ID
const product = {
  id: 1,
  name: "Classic White Oversized T-Shirt",
  price: 8500,
  rating: 4.6,
  reviews: 230,
  category: "T-Shirts",
  description: "Premium cotton oversized t-shirt with a relaxed fit. Perfect for casual wear and layering. Made from 100% organic cotton for ultimate comfort.",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["White", "Black", "Grey", "Navy"],
  inStock: true,
  images: ["👕", "👔", "🎽"], // Mock images
  features: [
    "100% Organic Cotton",
    "Oversized Relaxed Fit",
    "Pre-shrunk Fabric",
    "Machine Washable",
    "Sustainable Production"
  ]
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  // Load cart from localStorage
  const getCart = (): CartItem[] => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  };

  const saveCart = (cart:CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: product.images[0]
    };

    const cart = getCart();
    const existingItemIndex = cart.findIndex(
      (item: CartItem) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    saveCart(cart);
    setAddedToCart(true);
    
    // Reset after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

const handleBuyNow = () => {

  if (!selectedSize) {

    alert("Please select a size");
    return;

  }


  handleAddToCart();


  if (!user) {

    router.push(
      "/auth/login?redirect=/checkout"
    );

    return;

  }


  router.push("/checkout");

};


  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Back button */}
      <Link href="/products" className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition mb-6">
        <ArrowLeft size={20} />
        <span className="text-sm">Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative bg-gray-100 rounded-2xl h-96 lg:h-[500px] flex items-center justify-center mb-4">
            <span className="text-8xl lg:text-9xl">{product.images[currentImage]}</span>
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl ${
                  currentImage === i ? "ring-2 ring-emerald-700" : ""
                }`}
              >
                {img}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-emerald-700 font-medium mb-1">{product.category}</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Color: {selectedColor}</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-xl text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Size: {selectedSize || "Select size"}</p>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 border rounded-xl text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-3 mb-8">
            <Button 
              onClick={handleAddToCart} 
              variant="outline" 
              size="lg" 
              className="flex-1"
              disabled={addedToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              {addedToCart ? "Added!" : "Add to Cart"}
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="flex-1">
              {user ? "Buy Now" : "Buy Now (Login Required)"}
            </Button>
          </div>

          {/* Guest notice */}
          {!user && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-emerald-700">
                <strong>Guest Shopping:</strong> Items added to cart are saved locally. 
                <Link href="/auth/login" className="underline font-medium"> Login</Link> to checkout and save your cart permanently.
              </p>
            </div>
          )}

          {/* Features */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-3">Features</p>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}