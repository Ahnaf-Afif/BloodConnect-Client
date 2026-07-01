"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaDroplet, FaGauge, FaRightFromBracket } from "react-icons/fa6";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await api.me();
        setUser(result.data);
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await api.logout();
      setUser(null);
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <nav className="flex items-center justify-between py-2 px-1">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold text-[#b42318] transition-opacity hover:opacity-80"
      >
        <FaDroplet />
        BloodConnect
      </Link>

      <div className="flex items-center gap-6 text-sm font-semibold text-[#49312d]">
        <Link
          href="/donation-requests"
          className="hover:text-[#b42318] transition-colors duration-300"
        >
          Donation Requests
        </Link>

        {user ? (
          <>
            <Link
              href="/funding"
              className="hover:text-[#b42318] transition-colors duration-300"
            >
              Funding
            </Link>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span
                  className="size-10 rounded-full bg-[#b42318] bg-cover bg-center ring-2 ring-[#f0d3cf] shadow-sm transition hover:ring-[#b42318]"
                  style={
                    user.avatar
                      ? { backgroundImage: `url(${user.avatar})` }
                      : {}
                  }
                />
              </button>

              {open && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl bg-white py-2 shadow-xl ring-2 ring-[#f0d3cf] overflow-hidden">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 font-medium text-[#241816] transition hover:bg-red-50"
                    onClick={() => setOpen(false)}
                  >
                    <FaGauge />
                    Dashboard
                  </Link>
                  <div className="border-t border-[#f0d3cf]"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left font-medium text-[#241816] transition-colors hover:bg-red-50"
                  >
                    <FaRightFromBracket />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-[#b42318] px-5 py-2 font-semibold text-white transition hover:bg-[#8a1810]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
