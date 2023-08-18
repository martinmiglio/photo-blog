import Link from "next/link";

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="w-full">
      <div
        className="flex min-w-full whitespace-nowrap flex-nowrap divide-x-2 divide-theme-200 overflow-x-auto overscroll-bouncing snap-x select-none mb-2"
        style={{ scrollbarColor: "#F8A5D0 #F8C4DC" }}
      >
        {tags.map((tag) => {
          return (
            <Link
              key={tag}
              className={`px-2 py-1 shrink-0 w-20 text-center snap-start mb-4 bg-theme-300`}
              href={`/?tag=${tag}`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
