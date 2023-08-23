import { PostInput } from "@/components/post/PostInput";
import { z } from "zod";

const schema = z.object({
  CDN_DOMAIN: z.string(),
});

const env = schema.parse(process.env);

export default function NewPostPage() {
  return <PostInput cdnDomain={env.CDN_DOMAIN} />;
}
