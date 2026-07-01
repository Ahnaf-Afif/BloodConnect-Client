export default function EmptyState({ title, text }) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-white to-[#fff8f6] p-12 text-center ring-2 ring-[#f0d3cf]/50 shadow-sm">
      <div className="inline-block p-4 rounded-full bg-[#b42318]/10 mb-4">
        <p className="text-5xl">📭</p>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-[#241816]">{title}</h2>
      <p className="mt-2 text-base text-[#674842] max-w-sm mx-auto">{text}</p>
    </div>
  );
}
