/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_ENVIRONMENT_URL: process.env.NEXT_ENVIRONMENT_URL,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
