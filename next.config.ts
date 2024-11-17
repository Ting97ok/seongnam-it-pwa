const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
  // PWA 설정
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
})