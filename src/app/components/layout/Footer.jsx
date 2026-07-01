import Link from "next/link";
import { FaDroplet } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-[#f0d3cf] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-[#b42318]"
            >
              <FaDroplet />
              BloodConnect
            </Link>
            <p className="mt-2 text-sm text-[#674842]">
              Connecting donors with people who need blood.
            </p>
          </div>

          <nav className="flex flex-wrap gap-5 text-sm font-semibold text-[#49312d]">
            <Link href="/donation-requests">Requests</Link>
            <Link href="/search">Search Donors</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-[#f0d3cf] pt-6 text-center text-xs text-[#674842]">
          Copyright 2026 BloodConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
