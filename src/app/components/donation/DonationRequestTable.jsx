"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaEye, FaPen, FaTrash, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

import ConfirmModal from "@/app/components/common/ConfirmModal";
import DonationStatusBadge from "./DonationStatusBadge";
import { api } from "@/lib/api";

export default function DonationRequestTable({
  requests,
  mode = "my",
  onRefresh,
}) {
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(id, status) {
    try {
      await api.updateDonationStatus(id, status);
      toast.success("Status updated");
      onRefresh();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      await api.deleteDonationRequest(deleteId);
      toast.success("Request deleted");
      setDeleteId(null);
      onRefresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  }

  if (requests.length === 0) {
    return null;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-[#f0d3cf]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#f0d3cf] bg-[#fff3f0]">
            <tr>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Blood</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Donor Info</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-b border-[#f0d3cf]">
                <td className="px-4 py-3">{request.recipientName}</td>
                <td className="px-4 py-3">
                  {request.recipientUpazila}, {request.recipientDistrict}
                </td>
                <td className="px-4 py-3">{request.donationDate}</td>
                <td className="px-4 py-3">{request.donationTime}</td>
                <td className="px-4 py-3">{request.bloodGroup}</td>
                <td className="px-4 py-3">
                  <DonationStatusBadge status={request.donationStatus} />
                </td>
                <td className="px-4 py-3">
                  {request.donationStatus === "inprogress" ? (
                    <div>
                      <p>{request.donorName}</p>
                      <p className="text-xs text-[#674842]">{request.donorEmail}</p>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/donation-requests/${request._id}`}
                      title="View request"
                      aria-label="View request"
                      className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#b42318] text-[#b42318]"
                    >
                      <FaEye />
                    </Link>

                    {mode !== "volunteer" && (
                      <>
                        <Link
                          href={`/dashboard/donation-requests/${request._id}/edit`}
                          title="Edit request"
                          aria-label="Edit request"
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#49312d] text-[#49312d]"
                        >
                          <FaPen />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(request._id)}
                          title="Delete request"
                          aria-label="Delete request"
                          className="inline-flex h-8 w-8 items-center justify-center rounded border border-red-500 text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}

                    {request.donationStatus === "inprogress" &&
                      mode !== "volunteer" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(request._id, "done")}
                            title="Mark as done"
                            aria-label="Mark as done"
                            className="inline-flex h-8 w-8 items-center justify-center rounded bg-green-600 text-white"
                          >
                            <FaCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(request._id, "canceled")
                            }
                            title="Cancel request"
                            aria-label="Cancel request"
                            className="inline-flex h-8 w-8 items-center justify-center rounded bg-gray-600 text-white"
                          >
                            <FaXmark />
                          </button>
                        </>
                      )}

                    {mode === "volunteer" && (
                      <select
                        value={request.donationStatus}
                        onChange={(event) =>
                          handleStatusChange(request._id, event.target.value)
                        }
                        className="rounded border border-[#e8c5bf] px-2 py-1 text-xs"
                      >
                        <option value="pending">pending</option>
                        <option value="inprogress">inprogress</option>
                        <option value="done">done</option>
                        <option value="canceled">canceled</option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete request?"
        message="This action cannot be undone."
        confirmText="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </>
  );
}
