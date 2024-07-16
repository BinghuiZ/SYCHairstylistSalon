'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { clientSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { Button, Card, Flex, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type IssueFormData = z.infer<typeof clientSchema>

const ClientForm = ({ client }: { client?: Client }) => {
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
    setIsSubmitting(true)
    console.log(data)
    setIsSubmitting(false)
  })

  return (
    <Card >
      <form className='space-y-3' onSubmit={onSubmit}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField.Root
              placeholder='Name'
              defaultValue={client?.name}
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Controller
          name='phone'
          control={control}
          render={({ field }) => (
            <TextField.Root
              placeholder='Phone'
              defaultValue={client?.phone}
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        <Flex gap='3' mt='4' justify='end'>
          <Button type='submit' disabled={isSubmitting}>
            Update
          </Button>
        </Flex>
      </form>
    </Card>
  )
}

export default ClientForm
