/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACK_URL: "http://localhost:3030",
  },
}

module.exports = nextConfig
