import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

// GET Method: Retrieve all bookings for a client by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
    include: {
      bookings: {
        orderBy: { startDateTime: 'desc' },
      },
    },
  })

  if (!client) return new Response('Client not found', { status: 404 })
  return NextResponse.json(client)
}
