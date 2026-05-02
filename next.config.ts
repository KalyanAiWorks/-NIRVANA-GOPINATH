/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'londonvfxbucket.s3.ap-south-1.amazonaws.com',
      }
    ]
  }
}
export default nextConfig;
