"use client";

import { FaMapMarkerAlt, FaDroplet } from "react-icons/fa6";

export default function UserProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="group relative rounded-2xl bg-linear-to-br from-white to-[#fff8f6] p-8 shadow-lg ring-1 ring-[#f0d3cf]/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-[#b42318]/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#241816]">{user.name}</h2>
            <p className="text-sm text-[#674842] mt-1">
              {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </p>
          </div>
          <span className="text-3xl">{user.avatar ? "👤" : "👥"}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50/50">
            <FaDroplet className="text-[#b42318]" />
            <div>
              <p className="text-xs text-[#674842] font-medium">Blood Type</p>
              <p className="font-bold text-[#241816]">
                {user.bloodGroup || "Not Specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50">
            <FaMapMarkerAlt className="text-blue-600" />
            <div>
              <p className="text-xs text-[#674842] font-medium">Location</p>
              <p className="font-bold text-[#241816]">
                {user.district || "Not Specified"}, {user.upazila || ""}
              </p>
            </div>
          </div>

          {user.email && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50">
              <span className="text-lg">✉️</span>
              <div>
                <p className="text-xs text-[#674842] font-medium">Email</p>
                <p className="font-bold text-[#241816] text-sm">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {user.status && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-green-100 to-green-50 px-4 py-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-green-700">
              Active Member
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
