export default function EmptyState({ title, text }) {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-sm ring-1 ring-[#f0d3cf]">
      <h2 className="text-xl font-bold text-[#241816]">{title}</h2>
      <p className="mt-2 text-[#674842]">{text}</p>
    </div>
  );
}
