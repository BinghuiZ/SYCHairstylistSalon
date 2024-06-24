import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

// GET Method: Retrieve a client by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
    include: {
      bookings: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!client) return new Response('client not found', { status: 404 })
  return NextResponse.json(client)
}

// UPDATE Method: Update a client's details by ID within a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    const body = await request.json()

    // Start a transaction
    const client = await prisma.$transaction(async (prisma) => {
      // Example of multiple operations within a transaction
      // Update client details
      const updatedclient = await prisma.client.update({
        where: { id: Number(params.id) },
        data: body,
      })

      // Additional operation(s) can be added here if needed
      // For example, logging the update or updating related records

      return updatedclient // Return the result of the transaction
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client within a transaction:', error)
    return new Response('Error updating client', { status: 500 })
  }
}

// DELETE Method: Delete a client by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    await prisma.client.delete({
      where: { id: Number(params.id) },
    })

    // Since a 204 status code is used, ensure no body is sent.
    // Adjust the response construction as per your server/framework's expectations for a 204 response.
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting client:', error)
    return new Response('Error deleting client', { status: 500 })
  }
}
