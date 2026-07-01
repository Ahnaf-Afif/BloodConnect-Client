import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function DonationRequestCard({ request }) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-5 ring-1 ring-[#f0d3cf]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#241816]">
            {request.recipientName}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-base text-[#674842]">
            <FaMapMarkerAlt className="text-[#b42318] shrink-0" />
            {request.recipientUpazila}, {request.recipientDistrict}
          </p>
        </div>

        <div className="rounded-md bg-[#fff0ed] px-4 py-3 text-center">
          <p className="text-2xl font-bold text-[#b42318]">
            {request.bloodGroup}
          </p>
          <p className="text-xs text-[#674842] font-semibold mt-1">
            Blood Type
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-[#49312d]">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-[#b42318] text-base" />
          <span className="font-medium">{request.donationDate}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaClock className="text-[#b42318] text-base" />
          <span className="font-medium">{request.donationTime}</span>
        </div>
      </div>

      <Link
        href={`/donation-requests/${request._id}`}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white hover:bg-[#8f1c14]"
      >
        View Details <FaArrowRight />
      </Link>
    </article>
  );
}
