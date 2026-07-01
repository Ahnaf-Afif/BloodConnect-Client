"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaDroplet, FaRightFromBracket, FaUsers } from "react-icons/fa6";
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
    <aside className="border-b border-[#f0d3cf] bg-white px-5 py-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="rounded-lg bg-[#b42318] p-4 text-white shadow-md">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaDroplet />
          BloodConnect
        </Link>
        <div className="mt-4 flex items-center gap-3 rounded-md bg-white/15 p-3">
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
              className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
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
          className="mt-2 flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-[#49312d] transition hover:bg-[#fff3f0]"
        >
          <FaRightFromBracket />
          Logout
        </button>
      </nav>
    </aside>
  );
}
