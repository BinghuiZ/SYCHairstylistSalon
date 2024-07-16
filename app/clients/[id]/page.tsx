import prisma from '@/prisma/client'
import { Container } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ClientForm from '../_components/clientForm'

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
      <ClientForm client={client} />
    </Container>
  )
}

export default ClientDetailPage
