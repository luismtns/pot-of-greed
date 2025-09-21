import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
}

const withMDX = createMDX({ extension: /\.mdx$/ })

export default withMDX(nextConfig)
