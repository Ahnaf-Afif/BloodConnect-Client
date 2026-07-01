"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import RoleGuard from "@/app/components/auth/RoleGuard";
import DonationRequestTable from "@/app/components/donation/DonationRequestTable";
import { api } from "@/lib/api";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function AllBloodDonationRequestPage() {
  const { user, loading: authLoading } = useAuthUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const isVolunteer = user?.role === "volunteer";

  async function loadRequests(showLoading = true) {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const query = makeQuery(page, limit, status);
      const result = await api.getAllDonationRequests(query);
      setRequests(result.data.items);
      setTotal(result.data.total);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    const query = makeQuery(page, limit, status);

    api
      .getAllDonationRequests(query)
      .then((result) => {
        setRequests(result.data.items);
        setTotal(result.data.total);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [authLoading, user, page, status]);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <RoleGuard roles={["admin", "volunteer"]}>
      <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold text-[#241816]">
        All Blood Donation Requests
      </h1>
      <p className="mt-2 text-[#674842]">
        Manage every blood request on the platform.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="status">
          Filter by status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="rounded-md border border-[#e8c5bf] px-3 py-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="mt-6">
        {requests.length === 0 ? (
          <EmptyState title="No requests found" text="No donation requests yet." />
        ) : (
          <DonationRequestTable
            requests={requests}
            mode={isVolunteer ? "volunteer" : "admin"}
            onRefresh={() => loadRequests(false)}
          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded border border-[#b42318] px-3 py-1 text-sm font-semibold text-[#b42318] disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-[#674842]">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border border-[#b42318] px-3 py-1 text-sm font-semibold text-[#b42318] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
      </main>
    </RoleGuard>
  );
}

function makeQuery(page, limit, status) {
  let query = `?page=${page}&limit=${limit}`;

  if (status) {
    query += `&status=${status}`;
  }

  return query;
}
