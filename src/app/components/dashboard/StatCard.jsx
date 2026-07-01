export default function StatCard({ icon: Icon, title, count }) {
  return (
    <section className="rounded-lg bg-white p-5 ring-1 ring-[#f0d3cf]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#674842]">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[#241816]">{count}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#fff0ed] text-xl text-[#b42318]">
          <Icon />
        </span>
      </div>
    </section>
  );
}
