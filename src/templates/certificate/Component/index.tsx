import type { Props } from '..'
import {
  Defs,
  Document,
  G,
  Image,
  LinearGradient,
  Link,
  Page,
  Path,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer'
import qrcode from 'qrcode'
import { createElement as h } from 'react'

const styles = StyleSheet.create({
  page: {
    color: '#123',
    fontFamily: 'Nunito Sans',
  },
})

const background = (
  <Svg id="visual" viewBox="0 0 900 600" width="900" height="600">
    <Rect x="0" y="0" width="900" height="600" fill="#dcd4c1"></Rect>
    <Defs>
      <LinearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
        <Stop offset="20%" stopColor="#dcd4c1" stopOpacity="1"></Stop>
        <Stop offset="80%" stopColor="#dcd4c1" stopOpacity="1"></Stop>
      </LinearGradient>
    </Defs>
    <Defs>
      <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
        <Stop offset="20%" stopColor="#dcd4c1" stopOpacity="1"></Stop>
        <Stop offset="80%" stopColor="#dcd4c1" stopOpacity="1"></Stop>
      </linearGradient>
    </Defs>
    <G transform="translate(900, 0)">
      <Path d="M0 297.5C-37.5 292.7 -75.1 287.8 -113.8 274.8C-152.6 261.8 -192.6 240.5 -207.2 207.2C-221.8 173.8 -210.9 128.4 -221.7 91.8C-232.5 55.3 -265 27.6 -297.5 0L0 0Z" fill="#daa453"></Path>
    </G>
    <G transform="translate(0, 600)">
      <Path d="M0 -297.5C38.6 -293.2 77.2 -289 113.8 -274.8C150.5 -260.7 185.2 -236.6 205.8 -205.8C226.4 -174.9 232.8 -137.2 245.8 -101.8C258.7 -66.4 278.1 -33.2 297.5 0L0 0Z" fill="#daa453"></Path>
    </G>
  </Svg>
)

const ribbon = (
  <Svg width={128} height={128} viewBox="0 0 32 32">
    <G fill="none">
      <Path fill="#095fbd" d="M10 19.313V29a1 1 0 0 0 1.515.858L16 27.166l4.485 2.692A1 1 0 0 0 22 29v-9.687A11.45 11.45 0 0 1 16 21c-2.199 0-4.253-.617-6-1.687"></Path>
      <Path fill="#1E4269" d="M22 20a9.96 9.96 0 0 1-6 2a9.96 9.96 0 0 1-6.36-2.283A9.98 9.98 0 0 1 6 12C6 6.477 10.477 2 16 2s10 4.477 10 10a9.99 9.99 0 0 1-4 8"></Path>
      <Path fill="#FAFAFA" d="m16.336 7.21l1.34 2.72l3.003.434c.307.044.43.422.207.64l-2.171 2.115l.513 2.99a.375.375 0 0 1-.544.394L16 15.09l-2.684 1.413a.375.375 0 0 1-.544-.395l.516-2.99l-2.174-2.115a.375.375 0 0 1 .207-.639l3.003-.434l1.34-2.72a.375.375 0 0 1 .672 0"></Path>
    </G>
  </Svg>
)

export const Component: React.FC<Props> = ({ data }) => {
  const qr = qrcode.toDataURL(data.verificationLink, {
    color: {
      dark: '#112233',
      light: '#0000',
    },
  })

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View fixed style={{ position: 'absolute', top: 0, left: 0 }}>
          {background}
        </View>
        <View style={{ position: 'absolute', top: 18, right: 18 }}>
          {ribbon}
        </View>
        <View>
          <View style={{ textAlign: 'center', paddingTop: 64 }}>
            <Text style={{ fontSize: 64, fontFamily: 'Great Vibes' }}>Certificate</Text>
            <Text style={{ fontSize: 12, marginTop: 48 }}>{data.date}</Text>
            <Text style={{ fontSize: 48, fontWeight: 700 }}>{data.fullname}</Text>
            <Text style={{ fontSize: 14, marginTop: 52 }}>has successfully completed</Text>
            <Text style={{ fontSize: 24, marginTop: 8 }}>{data.course.name}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 16, left: 16, padding: 16 }}>
          <Text style={{ textAlign: 'center', fontSize: 10 }}>Verify at</Text>
          <Image style={{ width: 120, height: 120 }} src={qr} />
          <Link style={{ fontSize: 10 }} src={data.verificationLink}>{data.verificationLink}</Link>
        </View>
      </Page>
    </Document>
  )
}
