import { createHash } from "crypto";
import { APIRoute, sanitizeKey } from "next-s3-upload";
import { z } from "zod";

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_RESOURCE_PREFIX: z.string(),
  AWS_REGION: z.string(),
});

const env = schema.parse(process.env);

export default APIRoute.configure({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  bucket: `${env.AWS_RESOURCE_PREFIX}-bucket`,
  region: env.AWS_REGION,
  key(req, filename) {
    const originalExtension = filename.split(".").pop().toLowerCase();
    const hash = createHash("sha256").update(`${Date.now()}-${filename}`);
    const newName = `${hash.digest("hex")}.${originalExtension}`;
    return sanitizeKey(newName);
  },
});
