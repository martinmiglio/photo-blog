import Link from "next/link";

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div
      className="flex whitespace-nowrap flex-nowrap divide-x-2 divide-theme-200 overflow-x-auto overscroll-bouncing snap-x select-none flex-grow"
      style={{ scrollbarColor: "#F8C4DC #FBE5EE" }}
    >
      {tags.map((tag) => {
        return (
          <Link
            key={tag}
            className={`px-2 py-1 shrink-0 w-20 min-w-fit text-center snap-start bg-theme-300`}
            href={`/?tag=${tag}`}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
