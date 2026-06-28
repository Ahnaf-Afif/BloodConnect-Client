"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import DonationRequestCard from "@/app/components/donation/DonationRequestCard";
import { api } from "@/lib/api";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        const result = await api.getDonationRequests("?limit=12");
        setRequests(result.data.items);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-[#fff8f6] px-5 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#241816]">Donation Requests</h1>
        <p className="mt-2 text-[#674842]">
          Browse pending blood requests and respond when you can help.
        </p>

        <div className="mt-8">
          {requests.length === 0 ? (
            <EmptyState
              title="No pending requests"
              text="New donation requests will appear here."
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {requests.map((request) => (
                <DonationRequestCard key={request._id} request={request} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
