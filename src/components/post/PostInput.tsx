"use client";

import Image from "@/components/atomic/Image";
import PhotoUpload from "@/components/atomic/PhotoUpload";
import { User } from "@/db/auth";
import { Post } from "@/db/post";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export function PostInput({ cdnDomain }: { cdnDomain: string }) {
  const [title, setTitle] = useState<string | undefined>();
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [slug, setSlug] = useState<string | undefined>();
  const session: any = useSession();

  if (!session || session.status !== "authenticated") {
    redirect("/");
  }

  const { user }: { user: User } = session.data;

  if (!user.poster) {
    redirect("/");
  }

  const validPost = title && body && imageURL;

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
      <PhotoUpload handleImageURLChange={setImageURL} cdnDomain={cdnDomain} />
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

function TitleInput({
  handleTitleChange,
}: {
  handleTitleChange?: (title: string) => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  const onChange = (value: string | undefined) => {
    setValue(value);
    handleTitleChange?.(value ?? "");
  };

  return (
    <input
      type="text"
      placeholder="Title"
      required
      className="w-full rounded border-b-4 border-theme-700 pl-2 pt-1 text-4xl font-black text-theme-600 focus:border-theme-500 focus:bg-theme-100 md:text-7xl"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function BodyInput({
  handleBodyChange,
}: {
  handleBodyChange?: (body: string) => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  const onChange = (value: string | undefined) => {
    setValue(value);
    handleBodyChange?.(value ?? "");
  };

  return (
    <MDEditor
      height={200}
      value={value}
      onChange={onChange}
      commands={[
        commands.bold,
        commands.italic,
        commands.divider,
        commands.link,
        commands.divider,
        commands.orderedListCommand,
        commands.unorderedListCommand,
      ]}
    />
  );
}

function TagsInput({
  handleTagsChange,
}: {
  handleTagsChange?: (tags: string[]) => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  const onChange = (value: string | undefined) => {
    setValue(value);

    const tags =
      value
        ?.toLowerCase()
        .split(" ") // Split by whitespace
        .map((tag) => tag.trim().replaceAll(/[^a-zA-Z0-9]/g, "")) // Remove whitespace and special characters
        .filter((tag) => tag !== "") // Remove empty tags
        .filter((tag, index, self) => self.indexOf(tag) === index) ?? []; // Remove duplicates
    handleTagsChange?.(tags);
  };

  return (
    <input
      type="text"
      placeholder="Tags, separated by spaces"
      className="w-full rounded border-b-4 border-theme-700 pl-2 pt-1 font-[350] text-theme-600 focus:border-theme-500 focus:bg-theme-100 text-xl"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
