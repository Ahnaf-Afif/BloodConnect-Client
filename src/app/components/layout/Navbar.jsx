"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
        className="text-2xl font-bold bg-linear-to-r from-[#b42318] to-[#8a1810] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        🩸 BloodConnect
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
                  className="size-10 rounded-full bg-linear-to-br from-[#b42318] to-[#8a1810] bg-cover bg-center ring-2 ring-[#f0d3cf] shadow-md hover:ring-[#b42318] transition-all"
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
                    className="block px-4 py-3 hover:bg-linear-to-r hover:from-[#b42318]/10 hover:to-transparent transition-all font-medium text-[#241816]"
                    onClick={() => setOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                  <div className="border-t border-[#f0d3cf]"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 text-left hover:bg-red-50 transition-colors font-medium text-[#241816]"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-linear-to-r from-[#b42318] to-[#8a1810] px-5 py-2 text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
