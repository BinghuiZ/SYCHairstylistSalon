import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const customers = await prisma.customer.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(customers)
}

export async function POST(request: NextRequest) {
  console.log('POST /api/customers');

  try {
    const body = await request.json();
    const { name, phoneNumber } = body;

    const customer = await prisma.customer.create({
      data: {
        name,
        phoneNumber,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response('Invalid request body', { status: 400 });
  }
}
