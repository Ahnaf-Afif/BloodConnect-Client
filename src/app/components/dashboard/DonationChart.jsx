const labels = {
  pending: "Pending",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

const colors = {
  pending: "bg-amber-500",
  inprogress: "bg-blue-500",
  done: "bg-green-600",
  canceled: "bg-gray-500",
};

export default function DonationChart({ stats, total }) {
  return (
    <section className="mt-6 rounded-lg bg-white p-5 ring-1 ring-[#f0d3cf]">
      <h2 className="text-xl font-bold text-[#241816]">Request Status</h2>
      <p className="mt-1 text-sm text-[#674842]">
        Current status of all donation requests.
      </p>

      <div className="mt-5 grid gap-4">
        {Object.entries(labels).map(([status, label]) => {
          const count = stats?.[status] || 0;
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={status}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#49312d]">{label}</span>
                <span className="text-[#674842]">{count}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f2e7e5]">
                <div
                  className={`h-full ${colors[status]}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
