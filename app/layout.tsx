// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '성남 IT 스터디',
  description: '성남 IT 정보 교류 스터디 커뮤니티',
  manifest: '/manifest.json',
  icons: {
    apple: [
      { url: '/icon512_maskable.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon512_rounded.png', sizes: '512x512', type: 'image/png' }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '성남 IT 스터디',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="ko">
      <head>
        {/* iOS 스플래시 스크린 */}

        {/* 다른 iOS 관련 메타 태그들 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="성남 IT 스터디" />
      </head>
      <body>{children}</body>
      </html>
  )
}