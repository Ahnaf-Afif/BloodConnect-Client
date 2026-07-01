import Link from "next/link";
import { FaHandHoldingHeart, FaSearchLocation } from "react-icons/fa";

import ContactSection from "@/app/components/home/ContactSection";
import Navbar from "@/app/components/layout/Navbar";

export default function Home() {
  const features = [
    {
      title: "🔍 Quick Matching",
      text: "Search donors by blood group, district and upazila in seconds.",
      color: "from-blue-50",
    },
    {
      title: "📋 Request Tracking",
      text: "Create and manage blood requests from your intuitive dashboard.",
      color: "from-green-50",
    },
    {
      title: "❤️ Community Support",
      text: "Donate funds to help blood donation organizations thrive.",
      color: "from-purple-50",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-[#fff8f6] via-white to-[#f5f5f5]">
      <section className="mx-auto max-w-7xl px-5 py-6">
        <Navbar />

        <div className="grid items-center gap-16 py-16 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 mb-6">
              <span className="text-2xl">🩸</span>
              <p className="text-sm font-semibold text-[#b42318]">
                Save Lives Today
              </p>
            </div>

            <h1 className="max-w-3xl text-5xl md:text-7xl font-black leading-tight bg-linear-to-r from-[#241816] via-[#b42318] to-[#8a1810] bg-clip-text text-transparent">
              Find donors faster when every minute matters.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-[#674842]">
              BloodConnect connects donors, volunteers, and admins on one
              powerful platform to save lives through streamlined blood donation
              management.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-linear-to-r from-[#b42318] to-[#8a1810] px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaHandHoldingHeart className="text-xl" />
                Join as a donor
              </Link>

              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#b42318] bg-white px-8 py-4 font-bold text-[#b42318] shadow-md hover:bg-red-50 hover:scale-105 transition-all duration-300"
              >
                <FaSearchLocation className="text-xl" />
                Search donors
              </Link>
            </div>

            <div className="mt-10 flex gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-[#b42318]">10K+</p>
                <p className="text-[#674842]">Active Donors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#b42318]">500+</p>
                <p className="text-[#674842]">Lives Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#b42318]">24/7</p>
                <p className="text-[#674842]">Support</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-linear-to-r from-[#b42318]/10 to-[#8a1810]/10 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl bg-linear-to-br from-white to-[#fff8f6] p-8 shadow-2xl ring-1 ring-white/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-[#b42318]/5 to-transparent p-4">
                  <div className="text-3xl">🩸</div>
                  <div>
                    <p className="font-bold text-[#241816]">Blood Type</p>
                    <p className="text-sm text-[#674842]">A+ • B+ • AB+ • O+</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-blue-50/50 to-transparent p-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <p className="font-bold text-[#241816]">Location Based</p>
                    <p className="text-sm text-[#674842]">
                      All Bangladesh Districts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-linear-to-r from-green-50/50 to-transparent p-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <p className="font-bold text-[#241816]">Instant Match</p>
                    <p className="text-sm text-[#674842]">
                      Real-time donor alerts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#241816] mb-4">
              Why Choose BloodConnect
            </h2>
            <p className="text-lg text-[#674842] max-w-2xl mx-auto">
              Everything you need to manage blood donations efficiently and save
              lives
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="group relative h-full rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-[#f0d3cf]/50 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#241816] group-hover:text-[#b42318] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#674842]">
                    {item.text}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#b42318]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300"></div>
              </article>
            ))}
          </div>
        </section>

        <ContactSection />

        <footer className="border-t border-[#f0d3cf] mt-20 py-12 text-[#674842]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-bold bg-linear-to-r from-[#b42318] to-[#8a1810] bg-clip-text text-transparent">
                BloodConnect
              </p>
              <p className="mt-2 text-sm">
                Connecting donors with those in need
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-medium">
              <Link
                href="/donation-requests"
                className="hover:text-[#b42318] transition-colors"
              >
                Requests
              </Link>
              <Link
                href="/search"
                className="hover:text-[#b42318] transition-colors"
              >
                Search
              </Link>
              <Link
                href="/register"
                className="hover:text-[#b42318] transition-colors"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="hover:text-[#b42318] transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
          <p className="mt-8 border-t border-[#f0d3cf] pt-8 text-center text-sm">
            © 2026 BloodConnect. All rights reserved. | Saving lives, one
            donation at a time.
          </p>
        </footer>
      </section>
    </main>
  );
}
