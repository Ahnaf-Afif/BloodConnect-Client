"use client";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  loading = false,
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
        aria-labelledby="confirm-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 id="confirm-title" className="text-lg font-bold text-[#241816]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#674842]">{message}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-[#b42318] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmText}
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
