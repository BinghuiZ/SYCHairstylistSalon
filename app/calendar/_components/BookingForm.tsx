'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { bookingSchema } from '@/app/validationSchema'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import { Fragment, useState } from 'react'
import { MouseEventHandler } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type BookingFormData = z.infer<typeof bookingSchema>

interface props {
  showModal: boolean
  setShowModal: (value: boolean) => void
  handleCloseModal: MouseEventHandler<HTMLButtonElement>
}

const BookingForm = ({ showModal, setShowModal, handleCloseModal }: props) => {
  const [error, setError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = handleSubmit(async (data) => {})

  const bookForm = () => {
    return (
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
        <ErrorMessage>
          {errors.startDateTime?.message}
        </ErrorMessage>
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
        <ErrorMessage>
          {errors.endDateTime?.message}
        </ErrorMessage>
      </Box>
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
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
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
  }

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setShowModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </TransitionChild>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  {/* <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <CheckCircledIcon
                      className='h-6 w-6 text-green-600'
                      aria-hidden='true'
                    />
                  </div> */}
                  <div className='mt-3 text-center sm:mt-5'>
                    {/* <DialogTitle
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900'
                    >
                      Add Event
                    </DialogTitle> */}
                    {bookForm()}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default BookingForm
