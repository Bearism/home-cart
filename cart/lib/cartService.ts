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

  async removeFromCart(productId: number): Promise<Cart> {
    try {
      console.log('Sending remove request:', { action: 'remove', productId });
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
      const result = await response.json();
      console.log('Remove response:', result);
      return result;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async updateQuantity(productId: number, quantity: number): Promise<Cart> {
    try {
      console.log('Sending update request:', { action: 'update', productId, quantity });
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
      const result = await response.json();
      console.log('Update response:', result);
      return result;
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
