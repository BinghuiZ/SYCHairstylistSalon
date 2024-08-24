import prisma from '@/prisma/client'
import { Box, Card, Container, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import BookingUpdateForm from './BookingUpdateForm'

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

  if (!booking) notFound()

  return (
    <Container>
      <Card asChild>
        <Box>
          <Text as='span' size='8'>
            Booking Details
          </Text>
          <BookingUpdateForm booking={booking} />
        </Box>
      </Card>
    </Container>
  )
}

export default ClientBookingPage
