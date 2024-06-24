import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clients = await prisma.client.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(clients)
}

export async function POST(request: NextRequest) {
  console.log('POST /api/clients');

  try {
    const body = await request.json();
    const { name, phone } = body;

    const client = await prisma.client.create({
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response('Invalid request body', { status: 400 });
  }
}
