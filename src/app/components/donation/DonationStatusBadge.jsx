const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  inprogress: "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
  canceled: "bg-gray-200 text-gray-700",
};

const statusLabels = {
  pending: "Pending",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

export default function DonationStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
