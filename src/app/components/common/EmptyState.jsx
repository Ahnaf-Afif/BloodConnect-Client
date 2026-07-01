import { FaInbox } from "react-icons/fa6";

export default function EmptyState({ title, text }) {
  return (
    <div className="rounded-lg bg-white p-10 text-center ring-1 ring-[#f0d3cf]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0ed] text-xl text-[#b42318]">
        <FaInbox />
      </div>
      <h2 className="mt-4 text-xl font-bold text-[#241816]">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-[#674842]">{text}</p>
    </div>
  );
}
