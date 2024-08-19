import { Client } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import ClientTableActions from './_components/ClientTableActions'

export interface ClientQuery {
  orderBy: keyof Client
  page: string
  q: string
}

interface Props {
  searchParams: ClientQuery
  clients: Client[]
}

const ClientTable = ({ searchParams, clients }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row align='center'>
          {headerColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} justify='center'>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                column.value !== undefined && (
                  <ArrowUpIcon className='inline' />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {clients.map((client) => (
          <Table.Row key={client.id} align='center'>
            <Table.ColumnHeaderCell justify='center'>
              {client.name}
            </Table.ColumnHeaderCell>
            <Table.Cell justify='center'>{client.phone}</Table.Cell>
            <Table.Cell justify='center'>
              {client.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell justify='center'>
              <ClientTableActions clientId={client.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const headerColumns: {
  label: string
  value?: keyof Client
}[] = [
  { label: 'Name', value: 'name' },
  { label: 'Phone', value: 'phone' },
  { label: 'CreatedAt', value: 'createdAt' },
  { label: 'Actions' },
]

export const columnNames = headerColumns
  .filter((column) => column.value !== undefined)
  .map((column) => column.value)

export default ClientTable
