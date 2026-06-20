"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardLinks } from "@/constants/dashboardLinks";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[#f0d3cf] bg-white px-5 py-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <Link href="/" className="text-2xl font-bold text-[#b42318]">
        BloodConnect
      </Link>

      <nav className="mt-6 grid gap-2">
        {dashboardLinks.map((link) => {
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
      </nav>
    </aside>
  );
}
