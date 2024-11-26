import type { Metadata } from "next";
import "./globals.css";
import {ServiceWorkerProvider} from "@/components/ServiceWorkerProvider";

export const metadata: Metadata = {
  icons: {
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/apple-icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
    icon: [
      { url: '/icon512_maskable.png', sizes: '512x512', type: 'image/png'},
      { url: '/icon512_rounded.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="manifest" href="https://progressier.app/rBrrqRDcIy6t945KAG2b/progressier.json"/>
      <script defer src="https://progressier.app/rBrrqRDcIy6t945KAG2b/script.js"></script>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name="apple-mobile-web-app-title" content="성남 IT 스터디"/>
      <title>성남 IT 스터디</title>
    </head>
    <body>
    <ServiceWorkerProvider>
      {children}
    </ServiceWorkerProvider>
    </body>
    </html>
  );
}
