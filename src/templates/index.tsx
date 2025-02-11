import type { Template } from './utils'
import HelloWorld from './HelloWorld'
import invoice from './invoice'

const templatesMap = new Map<string, Template>()
templatesMap.set(HelloWorld.id, HelloWorld)
templatesMap.set(invoice.id, invoice)

export default templatesMap
