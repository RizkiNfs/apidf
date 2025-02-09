import type { Template } from './utils'
import HelloWorld from './HelloWorld'

const templatesMap = new Map<string, Template>()
templatesMap.set('hello-world', HelloWorld)

export default templatesMap
