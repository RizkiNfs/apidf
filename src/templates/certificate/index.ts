import type { Template } from '../utils'
import * as z from 'zod'
import { Component } from './Component'

const dataSchema = z.object({
  fullname: z.string(),
  course: z.object({
    name: z.string(),
  }),
  date: z.string(),
  verificationLink: z.string(),
})

export interface Props {
  data: z.infer<typeof dataSchema>
}

const exampleData: Props['data'] = {
  fullname: 'John Doe',
  course: {
    name: 'Lorem Ipsum Dolor Sit Course',
  },
  date: 'Jan 1, 2025',
  verificationLink: 'https://rizkinfs.com',
}
const template: Template = {
  id: 'certificate',
  name: 'Certificate',
  thumbnail: '/thumbnail/certificate.jpg',
  Component,
  dataSchema,
  exampleData,
}

export default template
