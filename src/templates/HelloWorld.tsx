import type { Template } from './utils'
import { Document, Page, Text } from '@react-pdf/renderer'
import React from 'react'

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
  Component,
}

export default template
