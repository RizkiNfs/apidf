import templatesMap from '~/src/templates/index'

export default defineEventHandler(() => {
  return Array.from(templatesMap.values()).map((template) => {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      thumbnail: template.thumbnail,
    }
  })
})
