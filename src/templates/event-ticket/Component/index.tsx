import type { Props } from '..'
import process from 'node:process'
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import qrcode from 'qrcode'
import { createElement as h } from 'react'

const styles = StyleSheet.create({
  page: {
    color: '#fafafa',
    fontFamily: 'Nunito Sans',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: 'rgba(39, 39, 55, 0.70)',
  },
  eventName: {
    textAlign: 'center',
    fontSize: 48,
    fontFamily: 'Shrikhand',
  },
  venue: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 32,
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 800,
    marginTop: 32,
  },
  infoWrapper: {
    width: 220,
    height: '100%',
    color: '#112233',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 16,
  },
})

const background = <Image src={`${process.env.ORIGIN}/img/ticket-bg.png`} fixed style={styles.bg} />

export const Component: React.FC<Props> = ({ data }) => {
  const qr = qrcode.toDataURL(data.qrcode, {
    color: {
      dark: '#112233',
      light: '#0000',
    },
  })

  return (
    <Document>
      <Page size={{ width: 800, height: 320 }} style={styles.page}>
        {background}
        <View style={styles.wrapper}>
          <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 600 }}>
              Special Event
            </Text>
            <Text style={styles.eventName}>
              {data.eventName}
            </Text>
            <Text style={styles.venue}>
              {data.venue}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 14 }}>
              {data.location}
            </Text>
            <Text style={styles.dateTime}>
              {data.time}
              {' '}
              |
              {data.date}
            </Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>
              {data.holder.name}
            </Text>
            <Text>
              Price:
              {' '}
              <Text style={{ fontWeight: 800 }}>
                $
                {data.price}
              </Text>
            </Text>
            <View style={{ padding: 16 }}>
              <Image src={qr} />
            </View>
            <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Seat
                </Text>
                <Text style={{ fontWeight: 800, fontSize: 24 }}>
                  {data.holder.seat}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Row
                </Text>
                <Text style={{ fontWeight: 800, fontSize: 24 }}>
                  {data.holder.row}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Gate
                </Text>
                <Text style={{ fontWeight: 800, fontSize: 24 }}>
                  {data.holder.gate}
                </Text>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  )
}
