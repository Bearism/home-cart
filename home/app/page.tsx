'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { cartService, Product, Cart } from '../lib/cartService';

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Audio",
    rating: 4.8,
    reviews: 1247,
    features: ["Noise Cancelling", "40h Battery", "Premium Sound"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Wearables",
    rating: 4.6,
    reviews: 892,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"]
  },
  {
    id: 3,
    name: "Ultra HD Camera",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    category: "Photography",
    rating: 4.9,
    reviews: 567,
    features: ["4K Video", "20MP Sensor", "Stabilization"]
  },
  {
    id: 4,
    name: "Gaming Laptop Pro",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    category: "Computers",
    rating: 4.7,
    reviews: 2341,
    features: ["RTX 4070", "32GB RAM", "240Hz Display"]
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    category: "Audio",
    rating: 4.5,
    reviews: 1892,
    features: ["Active Noise Cancelling", "Touch Controls", "Wireless Charging"]
  },
  {
    id: 6,
    name: "Smart Home Hub",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Smart Home",
    rating: 4.4,
    reviews: 756,
    features: ["Voice Control", "100+ Compatible", "Easy Setup"]
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-400 ml-1">({rating})</span>
    </div>
  );
};

const ProductCard = ({ product, cart, onCartUpdate }: { 
  product: Product; 
  cart: Cart; 
  onCartUpdate: (cart: Cart) => void;
}) => {
  const cartItem = cart.items.find((item: any) => item.id === product.id);

  const handleAddToCart = async () => {
    try {
      console.log('Button clicked for product:', product.name);
      const updatedCart = await cartService.addToCart(product);
      onCartUpdate(updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="product-card group bg-card-bg border border-card-border rounded-2xl p-6 hover:border-accent/50 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
        {cartItem && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-accent text-white text-xs font-bold rounded-full">
              {cartItem.quantity}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold gradient-text">${product.price.toFixed(2)}</span>
          <StarRating rating={product.rating} />
        </div>
        
        <p className="text-gray-400 text-sm mb-4">
          {product.reviews.toLocaleString()} reviews
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.features.map((feature: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                {feature}
              </span>
            ))}
            </div>
          </div>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {cartItem ? `Add Another (${cartItem.quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};



export default function Home() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await cartService.getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleCartUpdate = (updatedCart: Cart) => {
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full">
                UI/UX Case Study
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Product</span>
              <br />
              <span className="text-white">Showcase</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our collection of premium tech products with cutting-edge features and stunning design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="http://localhost:3001" 
                className="px-8 py-4 bg-gradient-to-r from-accent to-accent-hover text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Cart
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </a>
              <button className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Handpicked products that combine innovation, quality, and style
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                cart={cart}
                onCartUpdate={handleCartUpdate}
              />
            ))}
          </div>
        </div>
      </section>





      {/* Footer */}
      <footer className="border-t border-card-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            This is a UI/UX case study showcasing modern web design principles
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>Built with Next.js</span>
            <span>•</span>
            <span>Styled with Tailwind CSS</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
