"use client";

// use client so local string works
export default function DateDisplay({ date }: { date: string }) {
  return (
    <div>
      {new Date(date).toLocaleString(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      })}
    </div>
  );
}
