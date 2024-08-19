'use client'

import NextLink from 'next/link'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'

interface TableActionsProps {
  clientId: number
}

const ClientTableActions = ({ clientId }: TableActionsProps) => {
  const handleDelete = () => {
    axios.delete(`/api/clients/${clientId}`).then(() => {
      window.location.reload()
    })
  }

  return (
    <div className='flex justify-center space-x-2 content-center'>
      <NextLink href={`/clients/${clientId}`}>
        <Button>Details</Button>
      </NextLink>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Remove User</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Are you sure? User will be removed from the system.
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red' onClick={() => handleDelete()}>
                Remove User
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

export default ClientTableActions
