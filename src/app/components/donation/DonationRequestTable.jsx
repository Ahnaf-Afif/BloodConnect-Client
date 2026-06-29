"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function DonationRequestTable({
  requests,
  mode = "my",
  onRefresh,
}) {
  const [deleteId, setDeleteId] = useState(null);

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
      await api.deleteDonationRequest(deleteId);
      toast.success("Request deleted");
      setDeleteId(null);
      onRefresh();
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (requests.length === 0) {
    return null;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-[#f0d3cf]">
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
                <td className="px-4 py-3 capitalize">{request.donationStatus}</td>
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
                      className="rounded border border-[#b42318] px-2 py-1 text-xs font-semibold text-[#b42318]"
                    >
                      View
                    </Link>

                    {mode !== "volunteer" && (
                      <>
                        <Link
                          href={`/dashboard/donation-requests/${request._id}/edit`}
                          className="rounded border border-[#49312d] px-2 py-1 text-xs font-semibold text-[#49312d]"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(request._id)}
                          className="rounded border border-red-500 px-2 py-1 text-xs font-semibold text-red-500"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {request.donationStatus === "inprogress" &&
                      mode !== "volunteer" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(request._id, "done")}
                            className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white"
                          >
                            Done
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(request._id, "canceled")
                            }
                            className="rounded bg-gray-600 px-2 py-1 text-xs font-semibold text-white"
                          >
                            Cancel
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

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-bold text-[#241816]">Delete request?</h3>
            <p className="mt-2 text-sm text-[#674842]">
              This action can not be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-md border border-[#e8c5bf] px-4 py-2 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
