'use client'

import { Button, Dialog, Flex, TextField, Callout } from '@radix-ui/themes'
import { useState } from 'react'
import { z } from 'zod'
import { clientSchema } from '@/app/validationSchema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type ClientFormData = z.infer<typeof clientSchema>

const ClientAction = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value)
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(searchParams)
      params.set('q', inputValue)
      router.push(`/clients?${params.toString()}`)
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      axios.post('/api/clients', data)
      router.push('/clients')
      router.refresh()
      setIsSubmitting(false)
      setModalOpen(false)
    } catch (error) {
      setIsSubmitting(false)
      setError('An error occurred. Please try again.')
    }
  })

  return (
    <Flex justify='between'>
      <TextField.Root
        placeholder='Search the clients…'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
      </TextField.Root>

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
    </Flex>
  )
}

export default ClientAction
