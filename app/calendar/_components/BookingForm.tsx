'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { bookingSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type BookingFormData = z.infer<typeof bookingSchema>

interface props {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const BookingForm = ({ showModal, setShowModal }: props) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = handleSubmit(async (data) => {})

  const onOpenChange = (value: boolean) => { 
    setShowModal(value)
    reset()
  }

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
                {...register('startDateTime')}
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
                {...register('endDateTime')}
              />
            )}
          />
          <ErrorMessage>{errors.endDateTime?.message}</ErrorMessage>
        </Box>
      </Flex>
      <Box>
        <Text>Amount</Text>
        <Controller
          name='amount'
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField.Root
              placeholder='Amount'
              defaultValue={0}
              {...register('amount')}
            />
          )}
        />
        <ErrorMessage>{errors.amount?.message}</ErrorMessage>
      </Box>
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
      <Box>
        <Text>Client</Text>
        <Controller
          name='clientId'
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField.Root
              placeholder='Client ID'
              defaultValue={0}
              {...register('clientId')}
            />
          )}
        />
        <ErrorMessage>{errors.clientId?.message}</ErrorMessage>
      </Box>
      <Flex gap='3' mt='4' justify='end'>
        <Button type='submit'>Add</Button>
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

export default BookingForm
