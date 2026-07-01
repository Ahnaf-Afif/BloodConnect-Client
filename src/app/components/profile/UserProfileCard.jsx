"use client";

import {
  FaDroplet,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa6";

export default function UserProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="rounded-lg border border-[#f0d3cf] bg-white p-8 shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#241816]">{user.name}</h2>
            <p className="text-sm text-[#674842] mt-1">
              {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </p>
          </div>
          <FaUser className="text-2xl text-[#b42318]" />
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
              <FaEnvelope className="text-green-700" />
              <div>
                <p className="text-xs text-[#674842] font-medium">Email</p>
                <p className="font-bold text-[#241816] text-sm">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {user.status && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
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
