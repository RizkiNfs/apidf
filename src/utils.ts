import type { H3Event } from 'h3'
import process from 'node:process'
import { createError, getRequestHeader } from 'h3'

export function validateApiKey(event: H3Event) {
  const apiKey = getRequestHeader(event, 'x-api-key')
  if (process.env.API_KEY !== apiKey) {
    throw createError({ status: 401, message: 'Unauthorized' })
  }
}
