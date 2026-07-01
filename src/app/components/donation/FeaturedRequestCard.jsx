"use client";

import Link from "next/link";
import { FaArrowRight, FaClock, FaLocationDot } from "react-icons/fa6";

export default function FeaturedRequestCard({ request }) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-5 ring-1 ring-[#f0d3cf]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#241816]">
              {request.recipientName}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#674842]">
              <FaLocationDot className="text-[#b42318]" />
              {request.recipientUpazila}, {request.recipientDistrict}
            </div>
          </div>
          <div className="rounded-md bg-[#fff0ed] px-4 py-3 text-center">
            <p className="text-2xl font-bold text-[#b42318]">
              {request.bloodGroup}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#8a1810]">Needed</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-[#674842]">
          <FaClock className="text-[#b42318]" />
          <span className="font-medium">
            {request.donationDate} at {request.donationTime}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-[#674842]">
          {request.hospitalName || "Medical emergency"}
        </p>

        <Link
          href={`/donation-requests/${request._id}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#b42318]"
        >
          View request <FaArrowRight />
        </Link>
    </article>
  );
}
