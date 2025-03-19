/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add output configuration to ensure proper static generation
  output: "standalone",
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
}

module.exports = nextConfig

