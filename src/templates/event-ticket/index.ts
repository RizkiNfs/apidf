import type { Template } from '../utils'
import * as z from 'zod'
import { Component } from './Component'

const dataSchema = z.object({
  eventName: z.string(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  location: z.string(),
  price: z.number(),
  holder: z.object({
    name: z.string(),
    seat: z.string(),
    row: z.string(),
    gate: z.string(),
  }),
  qrcode: z.string(),
})

export interface Props {
  data: z.infer<typeof dataSchema>
}

const exampleData: Props['data'] = {
  eventName: 'New Year Concert',
  date: '01-01-2025',
  time: '8:00 PM',
  venue: 'Jakarta Convention Center',
  location: 'Jl. Gatot Subroto No.1, Jakarta',
  price: 99,
  qrcode: 'qwertyuioopasdfghjklzxcvbnm',
  holder: {
    name: 'John Doe',
    seat: '1',
    row: 'A',
    gate: '9',
  },
}
const template: Template = {
  id: 'event-ticket',
  name: 'Event Ticket',
  description: 'Event ticket template',
  thumbnail: '/thumbnail/event.jpg',
  Component,
  dataSchema,
  exampleData,
}

export default template
