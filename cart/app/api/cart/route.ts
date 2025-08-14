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
    const { action, productId, quantity } = body;

    if (action === 'remove') {
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

    cartData.total = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartData.itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json(cartData, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
