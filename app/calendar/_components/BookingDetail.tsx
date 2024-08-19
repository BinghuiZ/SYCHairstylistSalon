'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { bookingSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Client } from '@prisma/client'
import { useRouter } from 'next/navigation'

type BookingFormData = z.infer<typeof bookingSchema>

interface props {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const BookingDetail = ({ showModal, setShowModal }: props) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })
  const [clientList, setClientList] = useState([] as Client[])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const requestData = {
        title: data.title,
        startDateTime: data.startDateTime.toISOString(),
        endDateTime: data.endDateTime.toISOString(),
        amount: data.amount,
        description: data.description,
        clientId: data.clientId,
      }
      await axios.post('/api/bookings', requestData)
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  })

  const onOpenChange = (value: boolean) => {
    setShowModal(value)
    reset()
  }

  const fetchClients = async () => {
    try {
      const clients = await axios.get('/api/clients')
      setClientList(clients.data as Client[])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const bookForm = (
    <form onSubmit={onSubmit}>
      <Box>
        <Text>Title</Text>
        <Controller
          name='title'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField.Root
              placeholder='Title'
              defaultValue=''
              {...register('title')}
            />
          )}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </Box>
      <Flex gap='2'>
        <Box>
          <Text>Start Date Time</Text>
          <Controller
            name='startDateTime'
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <TextField.Root
                type='datetime-local'
                {...register('startDateTime', { valueAsDate: true })}
              />
            )}
          />
          <ErrorMessage>{errors.startDateTime?.message}</ErrorMessage>
        </Box>
        <Box>
          <Text>End Date Time</Text>
          <Controller
            name='endDateTime'
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <TextField.Root
                type='datetime-local'
                {...register('endDateTime', { valueAsDate: true })}
              />
            )}
          />
          <ErrorMessage>{errors.endDateTime?.message}</ErrorMessage>
        </Box>
      </Flex>
      <Flex gap='2'>
        <Box>
          <Text>Amount</Text>
          <Controller
            name='amount'
            control={control}
            render={({ field }) => (
              <TextField.Root
                placeholder='Amount'
                type='number'
                {...register('amount', { valueAsNumber: true })}
              />
            )}
          />
          <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        </Box>
        <Box>
          <Flex direction='column'>
            <Text>Client</Text>
            <Controller
              name='clientId'
              control={control}
              render={({ field }) => (
                <Select.Root
                  onValueChange={(data) => {
                    field.onChange(parseInt(data))
                  }}
                >
                  <Select.Trigger placeholder='Select a client' />
                  <Select.Content position='popper'>
                    {clientList.map((client) => (
                      <Select.Item key={client.id} value={client.id.toString()}>
                        {client.name} | {client.phone}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            <ErrorMessage>{errors.clientId?.message}</ErrorMessage>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text>Description</Text>
        <Controller
          name='description'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextArea
              placeholder='Description...'
              defaultValue=''
              {...register('description')}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </Box>
      <Flex gap='3' mt='4' justify='end'>
        <Button type='submit'>Add</Button>
        <Dialog.Close>
          <Button color='crimson'>Cancel</Button>
        </Dialog.Close>
      </Flex>
    </form>
  )

  return (
    <Dialog.Root open={showModal} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: '640px' }}>
        <Dialog.Title>Add New Booking</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Fill out the form below to add a new booking to your list.
        </Dialog.Description>
        <Flex direction='column' gap='3'>
          {bookForm}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default BookingDetail
