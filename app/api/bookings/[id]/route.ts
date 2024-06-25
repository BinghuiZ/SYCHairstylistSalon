import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

// GET Method: Retrieve a booking by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  const booking = await prisma.booking.findUnique({
    where: { id: Number(params.id) },
    // Include related data if necessary, similar to the client example
  })

  if (!booking) return new Response('Booking not found', { status: 404 })
  return NextResponse.json(booking)
}

// PUT Method: Update a booking's details by ID within a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    const body = await request.json()

    const booking = await prisma.$transaction(async (prisma) => {
      const updatedBooking = await prisma.booking.update({
        where: { id: Number(params.id) },
        data: body,
      })

      // Additional operation(s) can be added here if needed

      return updatedBooking
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error updating booking within a transaction:', error)
    return new Response('Error updating booking', { status: 500 })
  }
}

// DELETE Method: Delete a booking by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    await prisma.booking.delete({
      where: { id: Number(params.id) },
    })
    return new Response('Booking deleted successfully', { status: 204 })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return new Response('Error deleting booking', { status: 500 })
  }
}