import type { Template } from './utils'
import eventTicket from './event-ticket'
import HelloWorld from './HelloWorld'
import invoice from './invoice'

const templatesMap = new Map<string, Template>()
templatesMap.set(invoice.id, invoice)
templatesMap.set(eventTicket.id, eventTicket)
templatesMap.set(HelloWorld.id, HelloWorld)

export default templatesMap
