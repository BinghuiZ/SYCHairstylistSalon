'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { bookingSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Booking } from '@prisma/client'
import { useRouter } from 'next/navigation'

type BookingFormData = z.infer<typeof bookingSchema>

interface Props {
  booking: Booking
}

const BookingUpdateForm = ({ booking }: Props) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: booking.title,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
      amount: booking.amount,
      description: booking.description,
      clientId: booking.clientId,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const requestData = {
        title: data.title,
        startDateTime: data.startDateTime.toISOString(),
        endDateTime: data.endDateTime.toISOString(),
        amount: data.amount,
        description: data.description,
      }
      const res = await axios.put(`/api/bookings/${booking.id}`, requestData)
    } catch (error) {
      console.error(error)
    }
  })

  function formatDateForDateTimeLocal(date: Date): string {
    return date.toISOString().slice(0, 16)
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/bookings/${booking.id}`)
        router.push(`/clients/${booking.clientId}`)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteDialog = (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Remove Booking</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth='450px'>
        <AlertDialog.Title>Remove Booking</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure you want to remove this booking?
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant='solid' color='red' onClick={() => handleDelete()}>
              Remove
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Text>Title</Text>
        <Controller
          name='title'
          control={control}
          defaultValue={booking.title}
          render={({ field }) => (
            <TextField.Root
              placeholder='Title'
              defaultValue={booking.title}
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
            defaultValue={booking.startDateTime}
            render={({ field }) => (
              <TextField.Root
                type='datetime-local'
                value={formatDateForDateTimeLocal(booking.startDateTime)}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                // {...register('startDateTime', { valueAsDate: true })}
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
            defaultValue={booking.endDateTime}
            render={({ field }) => (
              <TextField.Root
                type='datetime-local'
                value={formatDateForDateTimeLocal(booking.endDateTime)}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                // {...register('endDateTime', { valueAsDate: true })}
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
            defaultValue={booking.amount}
            render={({ field }) => (
              <TextField.Root
                placeholder='Amount'
                type='number'
                defaultValue={booking.amount}
                {...register('amount', { valueAsNumber: true })}
              />
            )}
          />
          <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        </Box>
      </Flex>
      <Box>
        <Text>Description</Text>
        <Controller
          name='description'
          control={control}
          defaultValue={booking.description}
          render={({ field }) => (
            <TextArea
              placeholder='Description...'
              defaultValue={booking.description ?? ''}
              {...register('description')}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </Box>
      <Flex gap='3' mt='4' justify='start'>
        <Button type='submit'>Update</Button>
        {deleteDialog}
      </Flex>
    </form>
  )
}

export default BookingUpdateForm
