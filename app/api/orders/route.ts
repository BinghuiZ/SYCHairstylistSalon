import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  console.log('POST /api/orders');

  try {
    const body = await request.json();
    const { price, description, customerId } = body;

    const order = await prisma.order.create({
      data: {
        price,
        description,
        customerId: Number(customerId)
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response('Invalid request body', { status: 400 });
  }
}
