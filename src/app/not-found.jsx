import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fff8f6] px-5 text-center">
      <h1 className="text-4xl font-bold text-[#b42318]">Page not found</h1>
      <p className="mt-3 text-[#674842]">
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
      >
        Back home
      </Link>
    </main>
  );
}
