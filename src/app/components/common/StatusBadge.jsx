"use client";

export default function StatusBadge({ status, variant = "default" }) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
      case "done":
        return "bg-green-100 text-green-700";
      case "inactive":
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

  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return "🟢";
      case "inactive":
        return "🔴";
      case "pending":
        return "⏳";
      case "inprogress":
        return "⚙️";
      case "done":
        return "✅";
      case "canceled":
        return "❌";
      default:
        return "○";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
    >
      <span className="text-base">{getStatusIcon()}</span>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
