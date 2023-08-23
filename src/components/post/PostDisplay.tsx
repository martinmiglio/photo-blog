import PostTags from "./PostTags";
import DateDisplay from "@/components/atomic/DateDisplay";
import Image from "@/components/atomic/Image";
import ShareButton from "@/components/atomic/ShareButton";
import { User } from "@/db/auth";
import { Post } from "@/db/post";
import ReactMarkdown from "react-markdown";
import rehypeRewrite from "rehype-rewrite";
import gfm from "remark-gfm";
import { z } from "zod";

const schema = z.object({
  BLOG_TITLE: z.string(),
  S3_DOMAIN: z.string(),
  PUBLIC_URL: z.string(),
});
const env = schema.parse(process.env);

export default function PostDisplay({
  post,
  user,
}: {
  post: Post;
  user: User | null;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl font-black text-theme-600 md:text-7xl">
        {post.title}
      </h1>
      <div className="flex items-center gap-2">
        <div className="m-2 h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={user?.image ?? `https://${env.S3_DOMAIN}/images/pfp.jpg`}
            width={40}
            height={40}
            alt={`${user?.name} pfp`}
          />
        </div>
        <h2 className="relative md:text-3xl text-2xl font-light text-theme-700 opacity-50 my-auto top-[0.12rem] flex gap-1">
          <div className="font-semibold">{user?.name}</div>
          {post.timestamp && (
            <>
              <div> - </div>
              <DateDisplay date={post.timestamp} />
            </>
          )}
        </h2>
      </div>
      <Image
        src={post.imageURL}
        width={736}
        height={981}
        alt="Showcase"
        priority
        quality={100}
        className="h-auto"
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
        <ShareButton
          url={`https://${env.PUBLIC_URL}/post/${post.slug}`}
          text={`check out this post${user ? " by " + user?.name : ""} on ${
            env.BLOG_TITLE
          }`}
        />
        {post.tags && <PostTags tags={post.tags} />}
      </span>
    </div>
  );
}
