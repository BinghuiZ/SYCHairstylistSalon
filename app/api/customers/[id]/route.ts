import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

// GET Method: Retrieve a customer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  const customer = await prisma.customer.findUnique({
    where: { id: Number(params.id) },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!customer) return new Response('Customer not found', { status: 404 })
  return NextResponse.json(customer)
}

// UPDATE Method: Update a customer's details by ID within a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    const body = await request.json()

    // Start a transaction
    const customer = await prisma.$transaction(async (prisma) => {
      // Example of multiple operations within a transaction
      // Update customer details
      const updatedCustomer = await prisma.customer.update({
        where: { id: Number(params.id) },
        data: body,
      })

      // Additional operation(s) can be added here if needed
      // For example, logging the update or updating related records

      return updatedCustomer // Return the result of the transaction
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error updating customer within a transaction:', error)
    return new Response('Error updating customer', { status: 500 })
  }
}

// DELETE Method: Delete a customer by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) return new Response('ID is required', { status: 400 })

  try {
    await prisma.customer.delete({
      where: { id: Number(params.id) },
    })

    // Since a 204 status code is used, ensure no body is sent.
    // Adjust the response construction as per your server/framework's expectations for a 204 response.
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return new Response('Error deleting customer', { status: 500 })
  }
}
