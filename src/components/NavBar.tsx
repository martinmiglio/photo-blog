"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const session: any = useSession();

  const signedIn = session && session.status === "authenticated";
  const isPoster = signedIn && session.data.user.poster;
  const pathname = usePathname();
  const showNav =
    !pathname?.startsWith("/signin") && !pathname?.startsWith("/new-post");

  return (
    <div className="relative flex w-full justify-between py-2">
      <h1 className="mx-auto text-3xl font-bold text-theme-600">
        <Link href="/">***REMOVED***</Link>
      </h1>
      {showNav && (
        <div className="py-2">
          <div className="absolute flex gap-4 left-0">
            {signedIn ? (
              <button className="hover:underline" onClick={() => signOut()}>
                sign out
              </button>
            ) : (
              <button
                className="hover:underline"
                onClick={() => signIn("google")}
              >
                sign in
              </button>
            )}
          </div>
          <div className="absolute flex gap-4 right-0">
            {isPoster && (
              <Link className="hover:underline" href="/new-post">
                new post
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
