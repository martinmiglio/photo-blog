const { z } = require("zod");

const schema = z.object({
  PUBLIC_URL: z.string().optional(),
  VERCEL_URL: z.string(),
  S3_DOMAIN: z.string(),
});

const env = schema.parse(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: env.PUBLIC_URL ?? env.VERCEL_URL },
      { protocol: "https", hostname: env.S3_DOMAIN },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
