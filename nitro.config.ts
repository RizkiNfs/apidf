// https://nitro.unjs.io/config
export default defineNitroConfig({
  handlers: [
    'hello-world',
    'invoice',
    'event-ticket',
    'certificate',
    'receipt',
  ].map((template) => {
    return {
      route: `/api/pdf/${template}`,
      method: 'post',
      handler: '~/src/templates/handler.tsx',
    }
  }),
  compatibilityDate: '2025-02-12',
})
