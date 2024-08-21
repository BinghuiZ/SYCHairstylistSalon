import prisma from '@/prisma/client'

interface ClientBookingPageProps {
  params: {
    id: string
    bookingId: string
  }
}

const fetchClientBooking = async (id: number, bookingId: number) => {
  return prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      client: true,
    },
  })
}

const ClientBookingPage = async ({ params }: ClientBookingPageProps) => {
  const booking = await fetchClientBooking(
    parseInt(params.id),
    parseInt(params.bookingId)
  )

  return (
    <div>
      <h1>Client Booking</h1>
      <pre>{JSON.stringify(booking, null, 2)}</pre>
    </div>
  )
}

export default ClientBookingPage
