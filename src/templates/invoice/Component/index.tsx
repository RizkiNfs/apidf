import type { Props } from '..'
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { createElement as h } from 'react'
import process from 'node:process'

Font.register({
  family: 'Inter',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/inter/inter-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
    { src: `${process.env.ORIGIN}/fonts/inter/inter-600.ttf`, fontStyle: 'normal', fontWeight: 600 },
  ],
})
Font.register({
  family: 'Great Vibes',
  fonts: [
    { src: `${process.env.ORIGIN}/fonts/great-vibes/great-vibes-400.ttf`, fontStyle: 'normal', fontWeight: 400 },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 12,
    color: '#2C3930',
    fontFamily: 'Inter',
  },
  title: {
    color: '#A27B5C',
    textAlign: 'center',
    fontSize: 48,
    marginTop: 24,
    marginBottom: 32,
    fontWeight: 600,
    fontFamily: 'Great Vibes',
  },
  tableHeader: {
    color: '#A27B5C',
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DCD7C9',
    paddingVertical: 8,
    fontWeight: 600,
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#DCD7C9',
    fontWeight: 600,
  },
  itemColumn: {
    width: '35%',
  },
  qtyColumn: {
    width: '15%',
    textAlign: 'right',
  },
  tableColumn: {
    width: '25%',
    textAlign: 'right',
  },
  pageFooter: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#DCD7C9',
    paddingTop: 8,
  },
})

export const Component: React.FC<Props> = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>
          ~ Invoice ~
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <View style={{ gap: 2, flexGrow: 1 }}>
            <Text style={{ marginBottom: 4, fontSize: 11, fontWeight: 600 }}>
              Billed To :
            </Text>
            <Text>{data?.billedTo?.name}</Text>
            <Text>{data?.billedTo?.contact}</Text>
            <Text>{data?.billedTo?.address}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, fontWeight: 600 }}>
              Invoice Number:
            </Text>
            <Text style={{ textAlign: 'right' }}>
              {data?.invoiceNumber}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 11, fontWeight: 600 }}>
              Due Date:
            </Text>
            <Text>{data?.date}</Text>
          </View>
        </View>
        <View style={{ marginTop: 48 }}>
          <View style={styles.tableHeader}>
            <Text style={styles.itemColumn}>Item</Text>
            <Text style={styles.qtyColumn}>Quantity</Text>
            <Text style={styles.tableColumn}>Price</Text>
            <Text style={styles.tableColumn}>Total</Text>
          </View>
          {data?.items.map((item, index) => (
            <View
              style={{ paddingHorizontal: 6, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, fontSize: 11, backgroundColor: index % 2 === 0 ? '#F7F3E9' : 'transparent' }}
            >
              <Text style={styles.itemColumn}>{item.name}</Text>
              <Text style={styles.qtyColumn}>{item.quantity}</Text>
              <Text style={styles.tableColumn}>{item.price}</Text>
              <Text style={styles.tableColumn}>{item.quantity * item.price}</Text>
            </View>
          ))}
          <View style={styles.tableFooter}>
            <Text>Total</Text>
            <Text style={styles.tableColumn}>
              {data?.items.reduce((total, item) => total + item.quantity * item.price, 0)}
            </Text>
          </View>
        </View>
        <View wrap={false} style={{ marginTop: 64, gap: 4 }}>
          <Text style={{ fontWeight: 600 }}>Payment Information</Text>
          <Text>Bank: Lorem</Text>
          <Text>Account Name: Ipsum</Text>
          <Text>Account Number: 1234567890</Text>
        </View>
        <View fixed style={styles.pageFooter}>
          <Text style={{ fontFamily: 'Great Vibes', fontSize: 18 }}>
            Ipsum Stationary
          </Text>
          <Text>123, Somewhere St, Bandung</Text>
        </View>
      </Page>
    </Document>
  )
}
