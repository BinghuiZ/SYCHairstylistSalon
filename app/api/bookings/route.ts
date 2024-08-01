import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// GET Method: Retrieve all bookings
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const start = params.get('start')
  const end = params.get('end')
  console.log('GET /api/bookings', params)
  const bookings = await prisma.booking.findMany({
    where: {
      startDateTime: {
        gte: new Date(start ?? new Date().toISOString()),
        lte: new Date(end ?? new Date().toISOString()),
      },
    },
    orderBy: { startDateTime: 'desc' },
  })

  return NextResponse.json(bookings)
}

// POST Method: Create a new booking
export async function POST(request: NextRequest) {
  console.log('POST /api/bookings')

  try {
    const body = await request.json()
    const { clientId, title, startDateTime, endDateTime, amount, description } =
      body

    const booking = await prisma.booking.create({
      data: {
        clientId,
        title,
        startDateTime,
        endDateTime,
        amount,
        description,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error parsing request body:', error)
    return new Response('Invalid request body', { status: 400 })
  }
}
