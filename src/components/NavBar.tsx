import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex w-full justify-between py-2">
      <h1 className="mx-auto text-2xl font-bold text-theme-600">
        <Link href="/">***REMOVED***</Link>
      </h1>
      {/* <div className="flex gap-4">
        <Link
          className="hover:underline"
          href="https://github.com/martinmiglio/"
        >
          my projects
        </Link>
      </div> */}
    </div>
  );
}
