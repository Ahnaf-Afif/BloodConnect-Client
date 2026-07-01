"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRightFromBracket, FaUsers } from "react-icons/fa6";
import { toast } from "react-toastify";

import { dashboardLinks } from "@/constants/dashboardLinks";
import { useAuthUser } from "@/hooks/useAuthUser";
import { api } from "@/lib/api";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthUser();

  const links = dashboardLinks.filter((link) => {
    if (link.adminOnly && user?.role !== "admin") return false;
    if (link.volunteerOrAdmin && user?.role === "donor") return false;
    if (link.donorOnly && user?.role !== "donor") return false;
    if (link.allowedRoles && !link.allowedRoles.includes(user?.role)) {
      return false;
    }
    return true;
  });

  async function handleLogout() {
    try {
      await api.logout();
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <aside className="border-b border-[#f0d3cf] bg-linear-to-b from-white to-[#fff8f6] px-5 py-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="rounded-2xl bg-linear-to-r from-[#b42318] to-[#8a1810] p-4 text-white shadow-lg">
        <Link href="/" className="text-2xl font-bold">
          🩸 BloodConnect
        </Link>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/15 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <FaUsers />
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.name || "Welcome"}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">
              {user?.role || "Member"}
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-6 grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#b42318] text-white shadow-md"
                  : "text-[#49312d] hover:bg-[#fff3f0]"
              }`}
            >
              <Icon />
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#49312d] transition hover:bg-[#fff3f0]"
        >
          <FaRightFromBracket />
          Logout
        </button>
      </nav>
    </aside>
  );
}
