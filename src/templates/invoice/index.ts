import type { Template } from '../utils'
import * as z from 'zod'
import { Component } from './Component'

const dataSchema = z.object({
  billedTo: z.object({
    name: z.string(),
    address: z.string(),
    contact: z.string(),
  }),
  invoiceNumber: z.string(),
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
  billedTo: {
    name: 'John Doe',
    address: '1234 Elm St.',
    contact: '08121212',
  },
  invoiceNumber: '12223',
  date: '2021-08-01',
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
  id: 'invoice',
  name: 'Invoice',
  description: 'Invoice template',
  thumbnail: '/thumbnail/invoice.jpg',
  Component,
  dataSchema,
  exampleData,
}

export default template
