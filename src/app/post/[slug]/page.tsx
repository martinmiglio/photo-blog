import { getPostBySlug } from "@/api/post";
import pfp from "@/assets/pfp.jpg";
import PostTags from "@/components/PostTags";
import { Post } from "@/types/Post/Post";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRewrite from "rehype-rewrite";
import gfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post: Post = await getPostBySlug(slug);
  return { title: post.title };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post: Post = await getPostBySlug(slug);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl font-black text-theme-600 md:text-7xl">
        {post.title}
      </h1>
      <div className="flex items-center gap-2">
        <div className="m-2 h-6 w-6 md:h-10 md:w-10 cursor-pointer overflow-hidden rounded-full">
          <Image src={pfp} width={40} height={40} alt="Emma Jo" />
        </div>
        <h2 className="relative md:text-3xl text-lg font-light text-theme-700 opacity-50 my-auto top-[0.12rem]">
          {post.author}
          {post.timestamp &&
            ` - ${new Date(post.timestamp).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}`}
        </h2>
      </div>
      <Image src={post.imageURL} width={768} height={432} alt="Showcase" />
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
      {post.tags && <PostTags tags={post.tags} />}
    </div>
  );
}
