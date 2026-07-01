"use client";

export default function DonateConfirmModal({
  open,
  user,
  loading,
  onConfirm,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 id="donate-title" className="text-lg font-bold text-[#241816]">
          Confirm Donation
        </h2>
        <p className="mt-2 text-sm text-[#674842]">
          Your name and email will be shared with the requester.
        </p>

        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-[#49312d]">Donor Name</dt>
            <dd className="mt-1 rounded-md bg-[#fff8f6] px-3 py-2">
              {user?.name}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#49312d]">Donor Email</dt>
            <dd className="mt-1 rounded-md bg-[#fff8f6] px-3 py-2">
              {user?.email}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-[#b42318] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Confirming..." : "Confirm"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-[#e8c5bf] px-4 py-2 font-semibold text-[#49312d]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
