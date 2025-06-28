import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/], // for static export compatibility
});

export default withPWA(nextConfig);
