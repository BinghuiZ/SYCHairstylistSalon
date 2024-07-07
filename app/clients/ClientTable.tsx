import { Client } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'

export interface ClientQuery {
  orderBy: keyof Client;
  page: string;
}

interface Props {
  searchParams: ClientQuery
  clients: Client[]
}

const ClientTable = ({ searchParams, clients }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {headerColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className='inline' />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {clients.map((client) => (
          <Table.Row key={client.id}>
            <Table.ColumnHeaderCell>{client.name}</Table.ColumnHeaderCell>
            <Table.Cell>{client.phone}</Table.Cell>
            <Table.Cell>{client.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const headerColumns: {
  label: string
  value: keyof Client
}[] = [
  { label: 'Name', value: 'name' },
  { label: 'Phone', value: 'phone' },
  { label: 'CreatedAt', value: 'createdAt' },
]

export const columnNames = headerColumns.map((column) => column.value)

export default ClientTable
