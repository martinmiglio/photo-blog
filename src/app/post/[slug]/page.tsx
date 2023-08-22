import CommentDisplay from "@/components/CommentDisplay";
import PostDisplay from "@/components/PostDisplay";
import { getUserById } from "@/db/auth";
import { getCommentsByPostSlug } from "@/db/comment";
import { getPostBySlug } from "@/db/post";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  S3_DOMAIN: z.string(),
  PUBLIC_URL: z.string(),
});

const env = schema.parse(process.env);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const user = await getUserById(post.authorId);

  if (!user) {
    return {};
  }

  return {
    title: post.title,
    twitter: {
      card: "summary_large_image",
      title: `post by ${user?.name} on ***REMOVED***`,
      description: "Emma Jo's blog",
      images: [`https://${env.PUBLIC_URL}/og/post?slug=${slug}&v1`],
    },
    openGraph: {
      type: "website",
      title: `post by ${user?.name} on ***REMOVED***`,
      description: "Emma Jo's blog",
      siteName: "***REMOVED***",
      images: [
        {
          url: `https://${env.PUBLIC_URL}/og/post?slug=${slug}&v1`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    redirect("/");
  }

  const [user, comments] = await Promise.all([
    getUserById(post.authorId),
    getCommentsByPostSlug(post.slug),
  ]);

  return (
    <div className="flex flex-col gap-3">
      <PostDisplay post={post} user={user} />
      <CommentDisplay comments={comments} postSlug={post.slug} />
    </div>
  );
}
