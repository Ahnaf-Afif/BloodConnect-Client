import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function DonationRequestCard({ request }) {
  return (
    <article className="group relative h-full flex flex-col rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ring-1 ring-[#f0d3cf]/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#b42318]/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
      
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#241816] group-hover:text-[#b42318] transition-colors">
            {request.recipientName}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-base text-[#674842]">
            <FaMapMarkerAlt className="text-[#b42318] flex-shrink-0" />
            {request.recipientUpazila}, {request.recipientDistrict}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 px-4 py-3 text-center ring-2 ring-[#b42318]/20">
          <p className="text-3xl font-bold text-[#b42318]">{request.bloodGroup}</p>
          <p className="text-xs text-[#674842] font-semibold mt-1">Blood Type</p>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-3 text-sm text-[#49312d]">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50/50">
          <FaCalendarAlt className="text-[#b42318] text-base" />
          <span className="font-medium">{request.donationDate}</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50/50">
          <FaClock className="text-[#b42318] text-base" />
          <span className="font-medium">{request.donationTime}</span>
        </div>
      </div>

      <Link
        href={`/donation-requests/${request._id}`}
        className="mt-6 relative z-10 inline-flex justify-center rounded-lg bg-gradient-to-r from-[#b42318] to-[#8a1810] px-5 py-3 font-bold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        View Details →
      </Link>
    </article>
  );
}
