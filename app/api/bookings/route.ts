import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// GET Method: Retrieve all bookings
export async function GET(request: NextRequest) {
  const bookings = await prisma.booking.findMany({
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(bookings)
}

// POST Method: Create a new booking
export async function POST(request: NextRequest) {
  console.log('POST /api/bookings')

  try {
    const body = await request.json()
    const { clientId, title, date, startTime, endTime, amount, description } =
      body

    const booking = await prisma.booking.create({
      data: {
        clientId,
        title,
        date,
        startTime,
        endTime,
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
