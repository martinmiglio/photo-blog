import { getAllPosts } from "@/api/post";
import { TagsBrowser } from "@/components/TagsBrowser";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await getAllPosts();

  return <TagsBrowser posts={posts} initalTag={searchParams.tag} />;
}
