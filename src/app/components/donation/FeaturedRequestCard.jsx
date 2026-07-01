"use client";

import Link from "next/link";
import { FaHeartPulse, FaClock, FaMapMarkerAlt } from "react-icons/fa6";

export default function FeaturedRequestCard({ request }) {
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "O+": "from-red-100 to-red-50",
      "O-": "from-orange-100 to-orange-50",
      "A+": "from-blue-100 to-blue-50",
      "A-": "from-cyan-100 to-cyan-50",
      "B+": "from-green-100 to-green-50",
      "B-": "from-emerald-100 to-emerald-50",
      "AB+": "from-purple-100 to-purple-50",
      "AB-": "from-indigo-100 to-indigo-50",
    };
    return colors[bloodGroup] || "from-gray-100 to-gray-50";
  };

  return (
    <article className="group relative h-full rounded-2xl bg-white overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ring-1 ring-[#f0d3cf]/50">
      <div
        className={`h-2 bg-linear-to-r ${getBloodGroupColor(request.bloodGroup)}`}
      ></div>

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#241816] group-hover:text-[#b42318] transition-colors">
              {request.recipientName}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-[#674842]">
              <FaMapMarkerAlt className="text-[#b42318]" />
              {request.recipientUpazila}, {request.recipientDistrict}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-linear-to-br from-red-50 to-red-100 ring-2 ring-[#b42318]/20">
            <p className="text-2xl font-bold text-[#b42318]">
              {request.bloodGroup}
            </p>
            <p className="text-xs font-semibold text-[#8a1810] mt-1">Needed</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#674842] mb-4 p-3 rounded-lg bg-orange-50/50">
          <FaClock className="text-orange-600" />
          <span className="font-medium">
            {request.donationDate} at {request.donationTime}
          </span>
        </div>

        <p className="text-sm text-[#674842] mb-5 line-clamp-2">
          {request.hospitalName || "Medical emergency"}
        </p>

        <Link
          href={`/donation-requests/${request._id}`}
          className="inline-flex items-center gap-2 w-full justify-center rounded-lg bg-linear-to-r from-[#b42318] to-[#8a1810] px-4 py-3 font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn"
        >
          <FaHeartPulse className="text-lg group-hover/btn:scale-110 transition-transform" />
          Help Now
        </Link>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-[#b42318]/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
    </article>
  );
}
