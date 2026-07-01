"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHandHoldingHeart, FaTint, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

import DashboardWelcome from "@/app/components/dashboard/DashboardWelcome";
import DonationChart from "@/app/components/dashboard/DonationChart";
import StatCard from "@/app/components/dashboard/StatCard";
import DonationRequestTable from "@/app/components/donation/DonationRequestTable";
import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { api } from "@/lib/api";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthUser();
  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdminOrVolunteer =
    user?.role === "admin" || user?.role === "volunteer";

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
      <DashboardWelcome name={user?.name} />

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

          <DonationChart
            stats={stats.requestStats}
            total={stats.totalRequests}
          />
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

      {!isAdminOrVolunteer && recentRequests.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="No donation requests yet"
            text="Create a request when you or someone nearby needs blood."
          />
          <Link
            href="/dashboard/create-donation-request"
            className="mt-4 inline-block rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
          >
            Create Request
          </Link>
        </div>
      )}
    </main>
  );
}
