"use client";

import { User } from "@/db/auth";
import { Comment } from "@/db/comment";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { set } from "zod";

export default function CommentInput({ postSlug }: { postSlug: string }) {
  const [value, setValue] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const session: any = useSession();

  useEffect(() => {
    if (submitted) {
      redirect(`/post/${postSlug}?${new Date().getUTCSeconds()}`);
    }
  }, [postSlug, submitted]);

  if (!session || session.status !== "authenticated") {
    return <></>; // sign in to comment
  }

  const { user }: { user: User } = session.data;

  const onSubmit = async () => {
    if (!value || value.length === 0) {
      return;
    }
    const comment: Comment = {
      body: value,
      authorId: user.id,
      postSlug: postSlug,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(comment),
    });

    if (res.ok) {
      setValue("");
      setSubmitted(true);
    } else {
      alert("Post creation failed!");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="p-2 text-lg font-light text-theme-700 bg-theme-50 rounded-md"
          placeholder="new comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="p-2 text-lg border-theme-700 bg-theme-500  font-bold text-theme-50 hover:border-theme-500 hover:bg-theme-400 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
          disabled={!value || value.length === 0}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
