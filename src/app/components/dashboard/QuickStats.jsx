"use client";

import { FaHeartPulse, FaUsers, FaAward } from "react-icons/fa6";

export default function QuickStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3 my-8">
      <div className="group relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#f0d3cf]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-red-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="inline-flex p-3 rounded-xl bg-red-50 mb-4">
            <FaHeartPulse className="text-2xl text-[#b42318]" />
          </div>
          <p className="text-sm text-[#674842] font-medium">Active Donors</p>
          <p className="text-3xl font-bold text-[#241816] mt-2">10,000+</p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 12% this month
          </p>
        </div>
      </div>

      <div className="group relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#f0d3cf]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-blue-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-4">
            <FaUsers className="text-2xl text-blue-600" />
          </div>
          <p className="text-sm text-[#674842] font-medium">Help Seekers</p>
          <p className="text-3xl font-bold text-[#241816] mt-2">500+</p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 8% this month
          </p>
        </div>
      </div>

      <div className="group relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#f0d3cf]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-amber-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="inline-flex p-3 rounded-xl bg-amber-50 mb-4">
            <FaAward className="text-2xl text-amber-600" />
          </div>
          <p className="text-sm text-[#674842] font-medium">Lives Saved</p>
          <p className="text-3xl font-bold text-[#241816] mt-2">2,500+</p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 15% this month
          </p>
        </div>
      </div>
    </div>
  );
}
