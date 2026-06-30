"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaDroplet } from "react-icons/fa6";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await api.login({ email, password });
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div className="rounded-2xl bg-gradient-to-r from-[#fff5f3] to-[#fff8f6] p-4 ring-1 ring-[#f0d3cf]">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#b42318]">
          <FaDroplet /> Secure access
        </p>
        <p className="mt-1 text-sm text-[#674842]">
          Use your account to manage requests, track donations, and help more lives.
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
          placeholder="******"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b42318] to-[#8a1810] px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Logging in..." : "Login"}
        <FaArrowRight />
      </button>

      <p className="text-center text-sm text-[#674842]">
        New donor?{" "}
        <Link href="/register" className="font-semibold text-[#b42318] transition hover:text-[#8a1810]">
          Create account
        </Link>
      </p>
    </form>
  );
}
