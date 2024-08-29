/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // This disables static exports
    appDir: true,
  },
}

export default nextConfig
