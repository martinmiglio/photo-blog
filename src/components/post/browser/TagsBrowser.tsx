"use client";

import PostsGrid from "./PostsGrid";
import { Post } from "@/db/post";
import classNames from "classnames";
import { useState } from "react";

export function TagsBrowser({
  posts,
  initalTag,
}: {
  posts: Post[];
  initalTag?: string;
}) {
  const tagLatestPostMap: { [tag: string]: Post } = {};

  // Build a map of tags to their latest posts
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (tagLatestPostMap[tag]) {
          const latestPost = tagLatestPostMap[tag];
          if (!latestPost.timestamp || !post.timestamp) {
            return;
          }
          if (post.timestamp > latestPost.timestamp) {
            tagLatestPostMap[tag] = post;
          }
        } else {
          tagLatestPostMap[tag] = post;
        }
      });
    }
  });

  // Sort tags by latest post timestamp
  const tagsByLatest = Object.keys(tagLatestPostMap).sort((a, b) => {
    const postA = tagLatestPostMap[a];
    const postB = tagLatestPostMap[b];

    const timestampA = postA.timestamp
      ? new Date(postA.timestamp).getTime()
      : 0;
    const timestampB = postB.timestamp
      ? new Date(postB.timestamp).getTime()
      : 0;

    if (timestampB === timestampA) {
      return a.localeCompare(b); // Alphabetical sorting
    } else {
      return timestampB - timestampA;
    }
  });

  // Sort tags by post count
  const tags = ["all", ...tagsByLatest];

  const [selectedTag, setSelectedTag] = useState(initalTag ?? tags[0]);

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
        className="flex min-w-full whitespace-nowrap flex-nowrap divide-x-4 divide-theme-200 overflow-x-auto overscroll-bouncing snap-x select-none mb-2"
        style={{ scrollbarColor: "#F8A5D0 #F8C4DC" }}
      >
        {tags.map((tag) => {
          const isActive = tag === selectedTag;
          const backgroundColorClass = classNames({
            "bg-theme-400": isActive,
            "bg-theme-300": !isActive,
          });
          return (
            <div
              key={tag}
              className={`px-2 py-1 shrink-0 w-20 min-w-fit text-center snap-start mb-4 transition-colors cursor-pointer ${backgroundColorClass}`}
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
