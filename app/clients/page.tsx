import { Flex } from '@radix-ui/themes'
import ClientAction from '@/app/clients/_components/ClientAction'
import ClientTable from './ClientTable'
import prisma from '@/prisma/client'


const ClientsPage = async () => {
  const clients = await prisma.client.findMany()

  return (
    <Flex direction='column' gap='3'>
      <ClientAction />
      <ClientTable clients={clients} />
    </Flex>
  )
}


export default ClientsPage
