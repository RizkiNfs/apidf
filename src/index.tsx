import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { renderToStream } from '@react-pdf/renderer'
import {
  createApp,
  createRouter,
  defineEventHandler,
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

templatesMap.forEach((template, name) => {
  router.get(
    `/api/pdf/${name}`,
    defineEventHandler(async (event) => {
      const Component = template.Component
      const stream = await renderToStream(<Component />)
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
