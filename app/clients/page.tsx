import { Flex } from '@radix-ui/themes'
import ClientAction from '@/app/clients/_components/ClientAction'
import ClientTable, { ClientQuery, columnNames } from './ClientTable'
import prisma from '@/prisma/client'
import Pagination from '../components/Pagination'

interface Props {
  searchParams: ClientQuery
}

const ClientsPage = async ({ searchParams }: Props) => {
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  // const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const clients = await prisma.client.findMany({
    // where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const clientCount = await prisma.client.count()

  return (
    <Flex direction='column' gap='3'>
      <ClientAction />
      <ClientTable searchParams={searchParams} clients={clients} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={clientCount}
      />
    </Flex>
  )
}

/**
 * Represents a constant variable for dynamic behavior.
 */
export const dynamic = 'force-dynamic'

export default ClientsPage
