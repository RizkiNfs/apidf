import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { renderToStream } from '@react-pdf/renderer'
import {
  createApp,
  createError,
  createRouter,
  defineEventHandler,
  getRouterParam,
  readValidatedBody,
  sendStream,
  serveStatic,
  setResponseHeader,
  toNodeListener,
} from 'h3'
import { join } from 'pathe'
import React from 'react'

import templatesMap from './templates'

export const app = createApp()

const router = createRouter()
app.use(router)

router.get('/api/templates', defineEventHandler(() => {
  return Array.from(templatesMap.values()).map((template) => {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      thumbnail: template.thumbnail,
    }
  })
}))

router.get('/api/templates/:id', defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const template = templatesMap.get(id)

  if (!template)
    throw createError({ statusCode: 404 })

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    thumbnail: template.thumbnail,
    exampleData: template.exampleData,
  }
}))

templatesMap.forEach((template) => {
  router.post(
    `/api/pdf/${template.id}`,
    defineEventHandler(async (event) => {
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
    }),
  )
})

const publicDir = 'public'

app.use(
  defineEventHandler((event) => {
    return serveStatic(event, {
      getContents: id => readFile(join(publicDir, id)),
      getMeta: async (id) => {
        const stats = await stat(join(publicDir, id)).catch(() => {})

        if (!stats || !stats.isFile()) {
          return
        }

        return {
          size: stats.size,
          mtime: stats.mtimeMs,
        }
      },
    })
  }),
)

createServer(toNodeListener(app)).listen(3000)
