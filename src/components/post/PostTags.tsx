import Link from "next/link";

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div
      className="overscroll-bouncing flex flex-grow select-none snap-x flex-nowrap divide-x-2 divide-theme-200 overflow-x-auto whitespace-nowrap"
      style={{ scrollbarColor: "#F8C4DC #FBE5EE" }}
    >
      {tags.map((tag) => {
        return (
          <Link
            key={tag}
            className={`w-20 min-w-fit shrink-0 snap-start bg-theme-300 px-2 py-1 text-center`}
            href={`/?tag=${tag}`}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
