import type { Template } from './utils'
import { Document, Page, Text } from '@react-pdf/renderer'
import { createElement as h } from 'react'

const Component: React.FC = () => {
  return (
    <Document>
      <Page style={{ padding: 10 }}>
        <Text>hello</Text>
        <Text>world</Text>
      </Page>
    </Document>
  )
}

const template: Template = {
  id: 'hello-world',
  name: 'HelloWorld',
  Component,
}

export default template
