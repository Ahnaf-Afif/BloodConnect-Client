"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHandHoldingHeart, FaTint, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

import DonationRequestTable from "@/app/components/donation/DonationRequestTable";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { api } from "@/lib/api";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthUser();
  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdminOrVolunteer = user?.role === "admin" || user?.role === "volunteer";

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        if (isAdminOrVolunteer) {
          const result = await api.getStats();
          setStats(result.data);
        } else {
          const result = await api.getMyDonationRequests("?limit=3");
          setRecentRequests(result.data.items);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadData();
    }
  }, [authLoading, user, isAdminOrVolunteer]);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-[#b42318] mb-2">👋 Welcome Back</p>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#241816] via-[#b42318] to-[#8a1810] bg-clip-text text-transparent">
          Dashboard, {user?.name}</h1>
      </div>

      {isAdminOrVolunteer && stats && (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              icon={FaUsers}
              title="Total Donors"
              count={stats.totalUsers}
            />
            <StatCard
              icon={FaHandHoldingHeart}
              title="Total Funding"
              count={`$${stats.totalFunding}`}
            />
            <StatCard
              icon={FaTint}
              title="Total Requests"
              count={stats.totalRequests}
            />
          </div>

          <div className="mt-6 rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0d3cf]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#241816]">
                  Platform Snapshot
                </h2>
                <p className="mt-1 text-sm text-[#674842]">
                  Quick overview of the current platform activity.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Donors",
                  value: stats.totalUsers,
                  max: Math.max(stats.totalUsers, 20),
                },
                {
                  label: "Requests",
                  value: stats.totalRequests,
                  max: Math.max(stats.totalRequests, 20),
                },
                {
                  label: "Funding",
                  value: stats.totalFunding,
                  max: Math.max(stats.totalFunding, 100),
                },
              ].map((item) => {
                const percent = Math.min(100, Math.round((item.value / item.max) * 100));

                return (
                  <div key={item.label} className="rounded-md bg-[#fff8f6] p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-[#49312d]">
                      <span>{item.label}</span>
                      <span>{item.label === "Funding" ? `$${item.value}` : item.value}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f0d3cf]">
                      <div
                        className="h-full rounded-full bg-[#b42318]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#674842]">{percent}% of target</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {!isAdminOrVolunteer && recentRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#241816]">Recent Requests</h2>
          <div className="mt-4">
            <DonationRequestTable
              requests={recentRequests}
              mode="my"
              onRefresh={async () => {
                const result = await api.getMyDonationRequests("?limit=3");
                setRecentRequests(result.data.items);
              }}
            />
          </div>
          <Link
            href="/dashboard/my-donation-requests"
            className="mt-4 inline-block rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </main>
  );
}

function StatCard({ icon: Icon, title, count }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#f0d3cf]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#b42318]/10 rounded-full -mr-10 -mt-10"></div>
      <Icon className="text-3xl text-[#b42318] relative z-10" />
      <p className="mt-4 text-4xl font-bold text-[#241816] relative z-10">{count}</p>
      <p className="mt-2 text-sm text-[#674842] font-semibold relative z-10">{title}</p>
    </section>
  );
}
