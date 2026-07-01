import Link from "next/link";
import { FaDroplet } from "react-icons/fa6";

import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fff8f6] px-5 py-10">
      <section className="mx-auto max-w-md rounded-lg bg-white p-8 ring-1 ring-[#f0d3cf]">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#b42318]"
        >
          <FaDroplet />
          BloodConnect
        </Link>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase text-[#b42318]">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#241816]">
            Login to your account
          </h1>
          <p className="mt-2 text-sm text-[#674842]">
            Access your dashboard and donation requests.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
