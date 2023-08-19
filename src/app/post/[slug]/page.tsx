import PostTags from "@/components/PostTags";
import ShareButton from "@/components/ShareButton";
import { getUserById } from "@/db/auth";
import { getPostBySlug } from "@/db/post";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRewrite from "rehype-rewrite";
import gfm from "remark-gfm";
import { z } from "zod";

const schema = z.object({
  S3_DOMAIN: z.string(),
  VERCEL_URL: z.string(),
  PUBLIC_URL: z.string().optional(),
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
      images: [`https://${env.PUBLIC_URL ?? env.VERCEL_URL}/og/post?slug=${slug}&v1`],
    },
    openGraph: {
      type: "website",
      title: `post by ${user?.name} on ***REMOVED***`,
      description: "Emma Jo's blog",
      siteName: "***REMOVED***",
      images: [
        {
          url: `https://${env.PUBLIC_URL ?? env.VERCEL_URL}/og/post?slug=${slug}&v1`,
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

  const user = await getUserById(post.authorId);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl font-black text-theme-600 md:text-7xl">
        {post.title}
      </h1>
      <div className="flex items-center gap-2">
        <div className="m-2 h-10 w-10 cursor-pointer overflow-hidden rounded-full">
          <Image
            src={user?.image ?? `https://${env.S3_DOMAIN}/images/pfp.jpg`}
            width={40}
            height={40}
            alt={`${user?.name} pfp`}
          />
        </div>
        <h2 className="relative md:text-3xl text-2xl font-light text-theme-700 opacity-50 my-auto top-[0.12rem]">
          {user?.name}
          {post.timestamp &&
            ` - ${new Date(post.timestamp).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}`}
        </h2>
      </div>
      <Image
        src={post.imageURL}
        width={768}
        height={432}
        alt="Showcase"
        priority
        quality={100}
      />
      <div className="text-2xl font-[350] text-theme-950">
        <ReactMarkdown
          rehypePlugins={[
            [
              rehypeRewrite,
              {
                rewrite: (node: { tagName: string }) =>
                  node.tagName === "h1" ? "h2" : node,
              },
            ],
          ]}
          remarkPlugins={[gfm]}
        >
          {post.body ?? ""}
        </ReactMarkdown>
      </div>
      <span className="flex gap-2">
        <ShareButton url={`https://${env.VERCEL_URL}/post/${post.slug}`} />
        {post.tags && <PostTags tags={post.tags} />}
      </span>
    </div>
  );
}
