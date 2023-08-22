const { z } = require("zod");

const schema = z.object({
  PUBLIC_URL: z.string(),
  VERCEL_URL: z.string(),
  S3_DOMAIN: z.string(),
});

const env = schema.parse(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: env.PUBLIC_URL },
      { protocol: "https", hostname: env.VERCEL_URL },
      { protocol: "https", hostname: env.S3_DOMAIN },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // only necessary for warning caused by aws-sdk and turbopack
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
        }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
