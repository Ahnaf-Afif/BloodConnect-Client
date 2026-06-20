import Link from "next/link";
import { FaHandHoldingHeart, FaSearchLocation } from "react-icons/fa";

export default function Home() {
  const steps = ["Register as a donor", "Create blood request", "Confirm donation"];

  return (
    <main className="min-h-screen bg-[#fff8f6]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#b42318]">
            BloodConnect
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium text-[#49312d]">
            <Link href="/donation-requests">Donation Requests</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#b42318]">
              Donate blood, save lives
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#241816] md:text-6xl">
              Find donors faster when every minute matters.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#674842]">
              BloodConnect helps donors, volunteers, and admins manage blood
              requests from one clean dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
              >
                <FaHandHoldingHeart />
                Join as a donor
              </Link>

              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b42318] px-5 py-3 font-semibold text-[#b42318]"
              >
                <FaSearchLocation />
                Search donors
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]">
            <div className="rounded-md bg-[#b42318] px-5 py-6 text-white">
              <p className="text-sm font-medium text-white/80">Today&apos;s goal</p>
              <h2 className="mt-3 text-3xl font-bold">
                Make help easier to find
              </h2>
            </div>

            <div className="mt-5 grid gap-3">
              {steps.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md bg-[#fff3f0] p-4"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-white font-bold text-[#b42318]">
                    {index + 1}
                  </span>
                  <span className="font-medium text-[#49312d]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
