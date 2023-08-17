import { getAllPosts } from "@/api/post";
import PostsGrid from "@/components/PostsGrid";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div>
      <PostsGrid posts={posts} />
    </div>
  );
}
