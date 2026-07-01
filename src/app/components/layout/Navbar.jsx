"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaDroplet,
  FaGauge,
  FaRightFromBracket,
  FaXmark,
} from "react-icons/fa6";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        setProfileOpen(false);
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
    <nav className="relative flex items-center justify-between px-1 py-3">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold text-[#b42318] transition-opacity hover:opacity-80"
      >
        <FaDroplet />
        BloodConnect
      </Link>

      <div className="hidden items-center gap-6 text-sm font-semibold text-[#49312d] md:flex">
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
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Open profile menu"
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

              {profileOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg bg-white py-2 shadow-lg ring-1 ring-[#f0d3cf]">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 font-medium text-[#241816] transition hover:bg-red-50"
                    onClick={() => setProfileOpen(false)}
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

      <Button
        isIconOnly
        variant="ghost"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        onPress={() => setMobileOpen(!mobileOpen)}
        className="text-[#49312d] md:hidden"
      >
        {mobileOpen ? <FaXmark /> : <FaBars />}
      </Button>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-30 grid gap-1 rounded-lg bg-white p-3 shadow-lg ring-1 ring-[#f0d3cf] md:hidden">
          <Link
            href="/donation-requests"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 font-semibold text-[#49312d]"
          >
            Donation Requests
          </Link>
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 font-semibold text-[#49312d]"
          >
            Search Donors
          </Link>
          {user ? (
            <>
              <Link
                href="/funding"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 font-semibold text-[#49312d]"
              >
                Funding
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 font-semibold text-[#49312d]"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-left font-semibold text-[#49312d]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-md bg-[#b42318] px-3 py-2 text-center font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
