/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_ENVIRONMENT_URL: process.env.NEXT_ENVIRONMENT_URL,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
