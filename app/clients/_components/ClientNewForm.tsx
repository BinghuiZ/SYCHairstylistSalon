import { Button, Dialog, Flex, TextField, Callout } from '@radix-ui/themes'
import { useState } from 'react'
import { z } from 'zod'
import { clientSchema } from '@/app/validationSchema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type ClientFormData = z.infer<typeof clientSchema>

const ClientNewForm = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/clients', data)
      router.push('/clients')
      router.refresh()
      setIsSubmitting(false)
      setModalOpen(false)
      setError('')
      reset()
    } catch (error) {
      setIsSubmitting(false)
      setError('An error occurred. Please try again.')
    }
  })

  return (
    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Dialog.Trigger>
        <Button>Add</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: '480px' }}>
        <Dialog.Title>Add New Client</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Fill out the form below to add a new client to your list.
        </Dialog.Description>

        <Flex direction='column' gap='3'>
          {error && (
            <Callout.Root color='red'>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <form className='space-y-3' onSubmit={onSubmit}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField.Root placeholder='Name' {...field} />
              )}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField.Root placeholder='Phone' {...field} />
              )}
            />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type='submit' disabled={isSubmitting}>
                Save
              </Button>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ClientNewForm
