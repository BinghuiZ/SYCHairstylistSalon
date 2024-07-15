import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

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
    <div>
      <h1>Client Detail Page</h1>
      <p>{client.name}</p>
      <p>{client.phone}</p>
      <p>{client.createdAt.toDateString()}</p>
    </div>
  )
}

export default ClientDetailPage
