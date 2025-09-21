import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
}

const withMDX = createMDX({ extension: /\.mdx$/ })

export default withMDX(nextConfig)
