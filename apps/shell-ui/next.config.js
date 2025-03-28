/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui", "@workspace/shared"],
  output: "standalone"
}

module.exports = nextConfig
