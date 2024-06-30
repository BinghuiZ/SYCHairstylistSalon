import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  phone: z
    .string()
    .length(8, 'Phone number must be 8 digits')
    .regex(/^\d+$/, 'Phone number must be numeric'),
})

export const bookingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  startDateTime: z.date(),
  endDateTime: z.date(),
  amount: z.number().default(0),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(65535)
    .optional()
    .nullable(),
  clientId: z.number(),
})
