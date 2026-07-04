/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [256, 384, 512, 640],
  },
  poweredByHeader: false,
}

export default nextConfig
