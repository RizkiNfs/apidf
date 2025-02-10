import type * as z from 'zod'

export interface ComponentProps {
  data: unknown
}
export interface Template {
  id: string
  Component: React.FC<ComponentProps>
  dataSchema?: z.ZodSchema
  thumbnail?: string
  name?: string
  description?: string
  exampleData?: unknown
}
