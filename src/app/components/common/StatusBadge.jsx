"use client";

import {
  FaBan,
  FaCircleCheck,
  FaCircleExclamation,
  FaClock,
  FaGear,
} from "react-icons/fa6";

const statusIcons = {
  active: FaCircleCheck,
  done: FaCircleCheck,
  inactive: FaBan,
  blocked: FaBan,
  canceled: FaBan,
  pending: FaClock,
  inprogress: FaGear,
};

export default function StatusBadge({ status, variant = "default" }) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
      case "done":
        return "bg-green-100 text-green-700";
      case "inactive":
      case "blocked":
      case "canceled":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inprogress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const StatusIcon = statusIcons[status] || FaCircleExclamation;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
    >
      <StatusIcon />
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
