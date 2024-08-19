import prisma from '@/prisma/client'
import { Card, Container, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ClientUpdateForm from '../_components/ClientUpdateForm'

interface Props {
  params: { id: string }
}

const fetchClient = async (id: number) => {
  return prisma.client.findUnique({
    where: { id },
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
          </Card>
        </Container>
      </Flex>
    </Container>
  )
}

export default ClientDetailPage
