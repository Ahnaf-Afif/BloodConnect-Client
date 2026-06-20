"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="******"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#d99b94]"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-[#674842]">
        New donor?{" "}
        <Link href="/register" className="font-semibold text-[#b42318]">
          Create account
        </Link>
      </p>
    </form>
  );
}
