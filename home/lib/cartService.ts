export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    features: string[];
  }
  
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
  }
  
  const API_BASE_URL = 'http://localhost:3000/api/cart';
  
  export const cartService = {
    async getCart(): Promise<Cart> {
      try {
        const response = await fetch(API_BASE_URL);
        return await response.json();
      } catch (error) {
        console.error('Error fetching cart:', error);
        return { items: [], total: 0, itemCount: 0 };
      }
    },

    async addToCart(product: Product): Promise<Cart> {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'add',
            product
          }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    },
  
    async removeFromCart(productId: number): Promise<Cart> {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'remove',
            productId
          }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    },
  
    async updateQuantity(productId: number, quantity: number): Promise<Cart> {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update',
            productId,
            quantity
          }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
      }
    },
  
    async clearCart(): Promise<Cart> {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'clear'
          }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    }
  };
  