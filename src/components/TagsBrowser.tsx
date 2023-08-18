"use client";

import PostsGrid from "@/components/PostsGrid";
import { Post } from "@/types/Post/Post";
import classNames from "classnames";
import { useState } from "react";

export function TagsBrowser({
  posts,
  initalTag,
}: {
  posts: Post[];
  initalTag?: string;
}) {
  let tags = posts.reduce((acc, post) => {
    if (!post.tags) {
      return acc;
    }
    post.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, [] as string[]);
  tags = ["all", ...tags];

  const [selectedTag, setSelectedTag] = useState(initalTag || tags[0]);

  const postsToDisplay =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags?.includes(selectedTag) ?? false);

  return (
    <div className="w-full">
      <TagsBrowserHeader
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <PostsGrid posts={postsToDisplay} />
    </div>
  );
}

export function TagsBrowserHeader({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: string[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}) {
  return (
    <div className="w-full">
      <div
        className="flex min-w-full whitespace-nowrap flex-nowrap divide-x-2 divide-theme-200 overflow-x-auto overscroll-bouncing snap-x select-none mb-2"
        style={{ scrollbarColor: "#F8A5D0 #F8C4DC" }}
      >
        {tags.map((tag) => {
          const isActive = tag === selectedTag;
          const backgroundColorClass = classNames({
            "bg-theme-300": isActive,
            "bg-theme-200": !isActive,
          });
          return (
            <div
              key={tag}
              className={`px-2 py-1 shrink-0 w-20 text-center snap-start mb-4 ${backgroundColorClass}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
