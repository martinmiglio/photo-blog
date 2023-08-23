"use client";

import Image from "@/components/atomic/Image";
import PhotoUpload from "@/components/atomic/PhotoUpload";
import { BodyInput, TagsInput, TitleInput } from "@/components/post/PostInput";
import { User } from "@/db/auth";
import { Post } from "@/db/post";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState<string | undefined>();
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [slug, setSlug] = useState<string | undefined>();

  const validPost = title && body && imageURL;

  const session: any = useSession();

  if (!session || session.status !== "authenticated") {
    redirect("/");
  }

  const { user }: { user: User } = session.data;

  if (!user.poster) {
    redirect("/");
  }

  const handleSubmit = async () => {
    if (!validPost) {
      alert("Finish before posting!");
      return;
    }

    const slug =
      title
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .replaceAll(" ", "-") +
      "-" +
      new Date().getTime();

    const post: Post = {
      title: title,
      body: body,
      imageURL: imageURL,
      slug: slug,
      timestamp: new Date().toISOString(),
      authorId: user.id,
      tags: tags,
    };

    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(post),
    });
    if (res.ok) {
      alert("Post created!");
      setSlug(post.slug);
    } else {
      alert("Post creation failed!");
    }
  };

  if (slug) {
    redirect(`/post/${slug}`);
  }

  return (
    <div data-color-mode="light" className="flex flex-col gap-3">
      <TitleInput handleTitleChange={setTitle} />
      <div className="flex items-center gap-2">
        <div className="m-2 h-10 w-10 cursor-pointer overflow-hidden rounded-full">
          <Image
            src={user.image ?? `https://via.placeholder.com/40`}
            width={40}
            height={40}
            alt={user.name ?? "pfp"}
          />
        </div>
        <h2 className="relative md:text-3xl text-2xl font-light text-theme-700 opacity-50 my-auto top-[0.12rem]">
          {user.name} -{" "}
          {new Date().toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </h2>
      </div>
      <PhotoUpload handleFileChange={setImageURL} />
      <BodyInput handleBodyChange={setBody} />
      <TagsInput handleTagsChange={setTags} />
      <button
        className="h-16 w-full rounded border-b-4 border-theme-700 bg-theme-500 text-xl font-bold text-theme-50 hover:border-theme-500 hover:bg-theme-400 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!validPost}
      >
        Make Post
      </button>
    </div>
  );
}
