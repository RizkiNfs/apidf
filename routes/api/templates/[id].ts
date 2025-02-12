import templatesMap from '~/src/templates/index'

export default defineEventHandler((event) => {
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
})
