import { TagsBrowser } from "@/components/post/browser/TagsBrowser";
import { getAllPosts } from "@/db/post";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await getAllPosts();

  return <TagsBrowser posts={posts} initalTag={searchParams.tag} />;
}
