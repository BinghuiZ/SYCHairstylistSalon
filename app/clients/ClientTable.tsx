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
          <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {clients.map((client) => (
          <Table.Row key={client.id}>
            <Table.ColumnHeaderCell>{client.id}</Table.ColumnHeaderCell>
            <Table.Cell>{client.name}</Table.Cell>
            <Table.Cell>{client.phone}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default ClientTable
