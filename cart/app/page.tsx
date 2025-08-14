'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { cartService } from '../lib/cartService';
import type { Cart, CartItem } from '../lib/cartService';

const CartItemComponent = ({ 
  item, 
  onCartUpdate 
}: { 
  item: CartItem; 
  onCartUpdate: (cart: Cart) => void;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    try {
      setIsUpdating(true);
      const updatedCart = await cartService.removeFromCart(item.id);
      onCartUpdate(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    
    try {
      setIsUpdating(true);
      const updatedCart = await cartService.updateQuantity(item.id, newQuantity);
      onCartUpdate(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`bg-card-bg border border-card-border rounded-2xl p-6 transition-all duration-300 ${
      isUpdating ? 'opacity-75 pointer-events-none' : 'hover:border-accent/50'
    }`}>
      <div className="flex gap-4">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <span className="text-sm text-gray-400">{item.category}</span>
            </div>
            <button 
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
                  item.quantity <= 1 
                    ? 'bg-gray-600/20 text-gray-500 cursor-not-allowed' 
                    : 'bg-accent/10 text-accent hover:bg-accent/20 hover:scale-105 active:scale-95'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-white font-medium w-8 text-center">
                {isUpdating ? (
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  item.quantity
                )}
              </span>
              <button 
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">${(item.price * item.quantity).toFixed(2)} total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Cart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const shipping = 9.99;
  const total = cart.total + shipping;

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
    setNotification({ message: 'Cart updated successfully!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClearCart = async () => {
    try {
      const updatedCart = await cartService.clearCart();
      setCart(updatedCart);
      setNotification({ message: 'Cart cleared successfully!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setNotification({ message: 'Failed to clear cart', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
      <header className="border-b border-card-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
            </div>
            <div className="flex items-center gap-3">
              {cart.items.length > 0 && (
                <button 
                  onClick={handleClearCart}
                  className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors"
                >
                  Clear Cart
                </button>
              )}
              <a 
                href="http://localhost:3000" 
                className="px-4 py-2 glass text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item: CartItem) => (
                <CartItemComponent key={item.id} item={item} onCartUpdate={handleCartUpdate} />
              ))}
            </div>
            
            {cart.items.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Add some products to get started</p>
                <a 
                  href="http://localhost:3000" 
                  className="px-6 py-3 bg-gradient-to-r from-accent to-accent-hover text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  Start Shopping
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-card-border pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
