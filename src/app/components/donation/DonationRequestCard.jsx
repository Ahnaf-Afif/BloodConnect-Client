import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function DonationRequestCard({ request }) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0d3cf]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#241816]">
            {request.recipientName}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-[#674842]">
            <FaMapMarkerAlt className="text-[#b42318]" />
            {request.recipientUpazila}, {request.recipientDistrict}
          </p>
        </div>

        <span className="rounded-md bg-[#fff3f0] px-3 py-1 text-lg font-bold text-[#b42318]">
          {request.bloodGroup}
        </span>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-[#49312d]">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#b42318]" />
          {request.donationDate}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-[#b42318]" />
          {request.donationTime}
        </p>
      </div>

      <Link
        href={`/donation-requests/${request._id}`}
        className="mt-6 inline-flex justify-center rounded-md bg-[#b42318] px-4 py-2 font-semibold text-white"
      >
        View Details
      </Link>
    </article>
  );
}
