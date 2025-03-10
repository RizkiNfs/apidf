import type { Template } from '../utils'
import * as z from 'zod'
import { Component } from './Component'

const dataSchema = z.object({
  store: z.object({
    name: z.string(),
    address: z.string(),
    contact: z.string(),
    email: z.string(),
  }),
  transactionId: z.string(),
  date: z.string(),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
})

export interface Props {
  data: z.infer<typeof dataSchema>
}

const exampleData: Props['data'] = {
  store: {
    name: 'Lorem Ipsum',
    address: '1234 Elm St.',
    contact: '08121212',
    email: 'lorem@ipsum.com'
  },
  transactionId: '12223',
  date: '01-01-2025 11:22',
  items: [
    { name: 'Pen', quantity: 9, price: 66 },
    { name: 'Book', quantity: 2, price: 120 },
    { name: 'Glue', quantity: 2, price: 80 },
    { name: 'Paper', quantity: 20, price: 2 },
    { name: 'Scissor', quantity: 6, price: 180 },
    { name: 'Stapler', quantity: 11, price: 75 },
    { name: 'Eraser', quantity: 4, price: 60 },
  ],
}
const template: Template = {
  id: 'receipt',
  name: 'Receipt',
  thumbnail: '/thumbnail/receipt.jpg',
  Component,
  dataSchema,
  exampleData,
}

export default template
