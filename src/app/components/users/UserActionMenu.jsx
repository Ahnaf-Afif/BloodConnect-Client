"use client";

import { FaEllipsisVertical } from "react-icons/fa6";

export default function UserActionMenu({
  user,
  open,
  onToggle,
  onAction,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        title="User actions"
        aria-label={`Actions for ${user.name}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#49312d] text-[#49312d]"
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-40 rounded-md bg-white py-2 shadow-lg ring-1 ring-[#f0d3cf]">
          <button
            type="button"
            onClick={() =>
              onAction(user.status === "active" ? "block" : "unblock", user._id)
            }
            className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
          >
            {user.status === "active" ? "Block" : "Unblock"}
          </button>

          {user.role !== "volunteer" && (
            <button
              type="button"
              onClick={() => onAction("volunteer", user._id)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
            >
              Make Volunteer
            </button>
          )}

          {user.role !== "admin" && (
            <button
              type="button"
              onClick={() => onAction("admin", user._id)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
            >
              Make Admin
            </button>
          )}
        </div>
      )}
    </div>
  );
}
