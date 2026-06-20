export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b42318]">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[#241816]">
        Welcome back to BloodConnect
      </h1>
      <p className="mt-2 max-w-2xl text-[#674842]">
        Your donation requests, profile, and admin tools will appear here as we
        connect each feature.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Requests", "Track and manage blood requests"],
          ["Donors", "Find matching donors by location"],
          ["Profile", "Keep your donor information updated"],
        ].map(([title, text]) => (
          <section
            key={title}
            className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0d3cf]"
          >
            <h2 className="text-xl font-bold text-[#241816]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#674842]">{text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
