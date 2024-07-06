import { Client } from '@prisma/client'
import { Table } from '@radix-ui/themes'

interface Props {
  clients: Client[]
}

const ClientTable = ({ clients }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {headerColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              {column.label}
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
