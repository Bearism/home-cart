import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (in production, you'd use a database)
let cartData = {
  items: [],
  total: 0,
  itemCount: 0
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
  return NextResponse.json(cartData, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, product, productId, quantity } = body;
    
    console.log('API received request:', { action, product, productId, quantity });
    console.log('Current cart before update:', cartData);

    if (action === 'add') {
      const existingItem = cartData.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartData.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        });
      }
    } else if (action === 'remove') {
      cartData.items = cartData.items.filter(item => item.id !== productId);
    } else if (action === 'update') {
      const item = cartData.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          cartData.items = cartData.items.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
    } else if (action === 'clear') {
      cartData = { items: [], total: 0, itemCount: 0 };
    }

    // Recalculate totals for all actions
    cartData.total = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartData.itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

    console.log('Cart after update:', cartData);
    return NextResponse.json(cartData, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
