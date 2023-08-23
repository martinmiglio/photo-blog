import Link from "next/link";
import { z } from "zod";

const schema = z.object({
  BLOG_AUTHOR: z.string(),
});
const env = schema.parse(process.env);

export default function FooterBar() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-between py-8 text-sm opacity-60">
      <div className="pb-1">
        © 2023 {env.BLOG_AUTHOR} - Created by{" "}
        <Link href="https://martinmiglio.dev/" className="hover:underline">
          Martin
        </Link>
      </div>
    </footer>
  );
}
