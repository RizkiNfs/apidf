import { renderToStream } from '@react-pdf/renderer'
import { createElement as h } from 'react'
import templatesMap from './index'

export default defineEventHandler(async (event) => {
  const id = event.path.split('/').pop()
  const template = templatesMap.get(id)

  const dataSchema = template.dataSchema
  const Component = template.Component
  let body: unknown
  if (dataSchema) {
    body = await readValidatedBody(event, dataSchema?.parse)
  }
  const stream = await renderToStream(<Component data={body} />)
  setResponseHeader(event, 'Content-Type', 'application/pdf')
  // @ts-expect-error stream is a ReadableStream
  return sendStream(event, stream)
})
