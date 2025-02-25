import type { Template } from './utils'
import certificate from './certificate'
import eventTicket from './event-ticket'
import helloWorld from './HelloWorld'
import invoice from './invoice'

const templatesMap = new Map<string, Template>()
templatesMap.set(invoice.id, invoice)
templatesMap.set(certificate.id, certificate)
templatesMap.set(eventTicket.id, eventTicket)
templatesMap.set(helloWorld.id, helloWorld)

export default templatesMap
