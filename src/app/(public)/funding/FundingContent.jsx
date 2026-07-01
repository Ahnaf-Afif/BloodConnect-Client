"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import FundingTable from "@/app/components/funding/FundingTable";
import GiveFundButton from "@/app/components/funding/GiveFundButton";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import Navbar from "@/app/components/layout/Navbar";
import { api } from "@/lib/api";

export default function FundingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    api
      .getFunds()
      .then((result) => setFunds(result.data))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (success === "true" && sessionId) {
      api
        .confirmFund(sessionId)
        .then(() => {
          toast.success("Thank you for your donation");
          return api.getFunds();
        })
        .then((result) => setFunds(result.data))
        .catch((error) => toast.error(error.message))
        .finally(() => router.replace("/funding"));
    }

    if (canceled === "true") {
      toast.info("Payment canceled");
      router.replace("/funding");
    }
  }, [success, sessionId, canceled, router]);

  const totalFunding = funds.reduce((total, fund) => total + fund.amount, 0);

  return (
    <main className="min-h-screen bg-[#fff8f6]">
      <section className="mx-auto max-w-6xl px-5 py-6">
        <Navbar />

        <div className="py-10">
          <h1 className="text-3xl font-bold text-[#241816]">Funding</h1>
          <p className="mt-2 text-[#674842]">
            Support blood donation organizations with a small fund.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[#f0d3cf] py-5">
            <div>
              <p className="text-sm text-[#674842]">Total raised</p>
              <p className="text-2xl font-bold text-[#241816]">
                ${totalFunding.toFixed(2)}
              </p>
            </div>
            <GiveFundButton />
          </div>

          <div className="mt-8">
            {loading ? (
              <LoadingSpinner />
            ) : funds.length === 0 ? (
              <EmptyState title="No funds yet" text="Be the first to donate." />
            ) : (
              <FundingTable funds={funds} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
