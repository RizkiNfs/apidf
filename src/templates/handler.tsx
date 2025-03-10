import process from 'node:process'
import { Font, renderToStream } from '@react-pdf/renderer'
import { createElement as h } from 'react'
import templatesMap from './index'

Font.register({
  family: 'Inter',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/inter/inter-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
    { src: `${process.env.ORIGIN}/fonts/inter/inter-600.ttf`, fontStyle: 'normal', fontWeight: 600 },
  ],
})

Font.register({
  family: 'Great Vibes',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/great-vibes/great-vibes-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
  ],
})

Font.register({
  family: 'Shrikhand',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/shrikhand/shrikhand-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
  ],
})

Font.register({
  family: 'Nunito Sans',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/nunito/nunito-sans-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
    { src: `${process.env.ORIGIN}/fonts/nunito/nunito-sans-800.ttf`, fontStyle: 'normal', fontWeight: 800 },
  ],
})

Font.register({
  family: 'Cutive Mono',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/cutive/cutive-mono-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
  ],
})

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
