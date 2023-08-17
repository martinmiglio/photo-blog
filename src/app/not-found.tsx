import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center text-theme-950">
      <h1 className="text-center text-9xl">404</h1>
      <h2 className="text-center text-4xl">someone&apos;s lost</h2>
      <p className="m-8 text-center opacity-70">
        <Link href="/" className="text-theme-500 hover:underline">
          go home
        </Link>
      </p>
    </div>
  );
}
