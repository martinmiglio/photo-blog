import { APIRoute, sanitizeKey } from "next-s3-upload";
import { z } from "zod";

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  S3_UPLOAD_BUCKET: z.string(),
  S3_UPLOAD_REGION: z.string(),
});

const env = schema.parse(process.env);

export default APIRoute.configure({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  bucket: env.S3_UPLOAD_BUCKET,
  region: env.S3_UPLOAD_REGION,
  key(req, filename) {
    return `images/${Date.now()}-${sanitizeKey(filename)}`;
  },
});
