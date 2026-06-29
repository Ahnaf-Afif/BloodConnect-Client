"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    <aside className="border-b border-[#f0d3cf] bg-white px-5 py-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <Link href="/" className="text-2xl font-bold text-[#b42318]">
        BloodConnect
      </Link>

      <nav className="mt-6 grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-[#b42318] text-white"
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
          className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold text-[#49312d] hover:bg-[#fff3f0]"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
