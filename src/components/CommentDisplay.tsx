import CommentInput from "./CommentInput";
import Image from "@/components/Image";
import { getUserById } from "@/db/auth";
import { Comment } from "@/db/comment";
import { z } from "zod";

const schema = z.object({
  S3_DOMAIN: z.string(),
});

const env = schema.parse(process.env);

export default function CommentDisplay({
  comments,
  postSlug,
}: {
  comments: Comment[] | null;
  postSlug: string;
}) {
  return (
    <div className="flex flex-col gap-3 divide-y divide-theme-300">
      {comments?.map((comment) => (
        <CommentCard key={comment.timestamp} comment={comment} />
      ))}
      <CommentInput postSlug={postSlug} />
    </div>
  );
}

async function CommentCard({ comment }: { comment: Comment }) {
  const user = await getUserById(comment.authorId);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="m-2 h-6 w-6 cursor-pointer overflow-hidden rounded-full">
          <Image
            src={user?.image ?? `https://${env.S3_DOMAIN}/images/pfp.jpg`}
            width={35}
            height={35}
            alt={`${user?.name} pfp`}
          />
        </div>
        <div>
          <div className="relative md:text-1xl text-2xl font-light text-theme-700 opacity-50 my-auto top-[0.12rem] flex gap-1">
            <div className="font-semibold">{user?.name}</div>
            {comment.timestamp &&
              ` - ${new Date(comment.timestamp).toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })}`}
          </div>
          <div className="text-2xl font-[350] text-theme-950">
            {comment.body}
          </div>
        </div>
      </div>
    </div>
  );
}
