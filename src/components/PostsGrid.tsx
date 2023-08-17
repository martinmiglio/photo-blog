import { Post } from "@/types/Post/Post";
import Image from "next/image";
import Link from "next/link";

function PostsGridItem({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} passHref>
      <div className="group relative h-56 w-56 bg-theme-600">
        <div className="h-full w-full overflow-hidden">
          <Image
            src={post.imageURL}
            alt={post.title}
            height={256}
            width={256}
            quality={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0  bg-theme-950 bg-opacity-40 p-2 text-center text-theme-100 opacity-0 transition-opacity  group-hover:opacity-100">
          <h3 className="text-lg">{post.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostsGridItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
