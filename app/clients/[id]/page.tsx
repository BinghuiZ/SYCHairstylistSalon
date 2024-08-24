import prisma from '@/prisma/client'
import { Card, Container, Flex, Heading, Table } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ClientUpdateForm from '../_components/ClientUpdateForm'
import NextLink from 'next/link'
import { Pencil2Icon } from '@radix-ui/react-icons'

interface Props {
  params: { id: string }
}

const fetchClient = async (id: number) => {
  return prisma.client.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

const ClientDetailPage = async ({ params }: Props) => {
  const client = await fetchClient(parseInt(params.id))

  if (!client) notFound()

  return (
    <Container>
      <Flex justify='between' gap='3' direction='column'>
        <ClientUpdateForm client={client} />
        <Container asChild={true}>
          <Card>
            <Heading>Booking History</Heading>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Details</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {client.bookings.map((booking) => (
                  <Table.Row key={booking.id}>
                    <Table.Cell>{booking.title}</Table.Cell>
                    <Table.Cell>{booking.description}</Table.Cell>
                    <Table.Cell>
                      {new Date(booking.startDateTime).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <NextLink
                        href={`/clients/${client.id}/bookings/${booking.id}`}
                      >
                        <Pencil2Icon />
                      </NextLink>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card>
        </Container>
      </Flex>
    </Container>
  )
}

export default ClientDetailPage
