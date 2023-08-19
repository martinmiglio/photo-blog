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
    domains: [
      env.PUBLIC_URL ?? env.VERCEL_URL,
      env.S3_DOMAIN,
      "via.placeholder.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
