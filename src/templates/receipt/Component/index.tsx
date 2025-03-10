import type { Props } from '..'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { createElement as h } from 'react'

const styles = StyleSheet.create({
  page: {
    padding: 12,
    fontSize: 12,
    fontFamily: 'Cutive Mono',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    borderTopWidth: 1,
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

})

export const Component: React.FC<Props> = ({ data }) => {
  return (
    <Document>
      <Page size={{width: 320}} style={styles.page}>
        <View style={{paddingTop: 32, paddingBottom: 24}}>
          <View style={{ gap: 2, flexGrow: 1, textAlign: 'center' }}>
            <Text style={{fontSize: 18}}>{data?.store?.name}</Text>
            <Text>{data?.store?.address}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 32}}>
              <Text>{data?.date}</Text>
              <Text style={{ textAlign: 'right' }}>
                Id. {data?.transactionId}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 28 }}>
            {data?.items.map((item) => (
              <View
                style={{ paddingHorizontal: 2, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2, fontSize: 11, }}
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
                Rp. {data?.items.reduce((total, item) => total + item.quantity * item.price, 0)}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 28 }}>
            <Text>Contact: {data?.store?.contact}</Text>
            <Text>Email: {data?.store?.email}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
