/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}

const { withContentlayer } = require('next-contentlayer')
module.exports = withContentlayer({ ...nextConfig })
