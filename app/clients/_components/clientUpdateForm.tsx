'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { clientSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import {
  Button,
  Card,
  Container,
  Flex,
  TextField,
  Text,
  Box,
  Callout,
  Heading,
} from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type IssueFormData = z.infer<typeof clientSchema>

const ClientUpdateForm = ({ client }: { client?: Client }) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(clientSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)

      await axios.put(`/api/clients/${client?.id}`, data)

      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      setError('An error occurred. Please try again.')
    }
  })

  return (
    <Container asChild={true}>
      <Card>
        <Heading>Profile</Heading>
        {error && (
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className='space-y-3' onSubmit={onSubmit}>
          <Box>
            <Text>Name</Text>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField.Root
                  placeholder='Name'
                  defaultValue={client?.name}
                  {...register('name')}
                />
              )}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Box>
          <Box>
            <Text>Phone</Text>
            <Controller
              name='phone'
              control={control}
              defaultValue={client?.phone}
              render={({ field }) => (
                <TextField.Root
                  placeholder='Phone'
                  defaultValue={client?.phone}
                  {...register('phone')}
                />
              )}
            />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Box>
          <Flex gap='3' mt='4' justify='end'>
            <Button type='submit' disabled={isSubmitting}>
              Update
            </Button>
          </Flex>
        </form>
      </Card>
    </Container>
  )
}

export default ClientUpdateForm
