"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import FeaturedRequestCard from "@/app/components/donation/FeaturedRequestCard";
import { api } from "@/lib/api";

export default function FeaturedSection() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDonationRequests("?limit=6")
      .then((result) => setRequests(result.data.items))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[#b42318]">
            Urgent needs
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#241816]">
            Recent Donation Requests
          </h2>
          <p className="mt-3 text-[#674842]">
            These recipients are currently waiting for a donor.
          </p>
        </div>
        <Link
          href="/donation-requests"
          className="inline-flex items-center gap-2 font-semibold text-[#b42318]"
        >
          View all <FaArrowRight />
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-[#674842]">Loading requests...</p>
        ) : requests.length === 0 ? (
          <EmptyState
            title="No pending requests"
            text="New donation requests will appear here."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => (
              <FeaturedRequestCard key={request._id} request={request} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
