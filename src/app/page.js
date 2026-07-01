import Link from "next/link";
import {
  FaBolt,
  FaClipboardList,
  FaDroplet,
  FaHandHoldingHeart,
  FaLocationDot,
  FaMagnifyingGlassLocation,
} from "react-icons/fa6";

import ContactSection from "@/app/components/home/ContactSection";
import Navbar from "@/app/components/layout/Navbar";

export default function Home() {
  const features = [
    {
      title: "Quick Matching",
      text: "Search donors by blood group, district and upazila in seconds.",
      icon: FaMagnifyingGlassLocation,
    },
    {
      title: "Request Tracking",
      text: "Create and manage blood requests from your intuitive dashboard.",
      icon: FaClipboardList,
    },
    {
      title: "Community Support",
      text: "Donate funds to help blood donation organizations thrive.",
      icon: FaHandHoldingHeart,
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf8]">
      <section className="mx-auto max-w-7xl px-5 py-6">
        <Navbar />

        <div className="grid items-center gap-16 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2">
              <FaDroplet className="text-[#b42318]" />
              <p className="text-sm font-semibold text-[#b42318]">
                Save Lives Today
              </p>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight text-[#241816] md:text-7xl">
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
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#b42318] px-8 py-4 font-bold text-white shadow-md transition hover:bg-[#8a1810]"
              >
                <FaHandHoldingHeart className="text-xl" />
                Join as a donor
              </Link>

              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#b42318] bg-white px-8 py-4 font-bold text-[#b42318] transition hover:bg-red-50"
              >
                <FaMagnifyingGlassLocation className="text-xl" />
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

          <div className="hidden lg:block">
            <div className="rounded-lg border border-[#ecd7d2] bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-lg bg-red-50 p-4">
                  <FaDroplet className="text-2xl text-[#b42318]" />
                  <div>
                    <p className="font-bold text-[#241816]">Blood Type</p>
                    <p className="text-sm text-[#674842]">A+, B+, AB+, O+</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4">
                  <FaLocationDot className="text-2xl text-blue-700" />
                  <div>
                    <p className="font-bold text-[#241816]">Location Based</p>
                    <p className="text-sm text-[#674842]">
                      All Bangladesh Districts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-green-50 p-4">
                  <FaBolt className="text-2xl text-green-700" />
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
                className="h-full rounded-lg border border-[#ecd7d2] bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-red-50 text-[#b42318]">
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="mt-5 text-2xl font-bold text-[#241816]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#674842]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactSection />

        <footer className="border-t border-[#f0d3cf] mt-20 py-12 text-[#674842]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-bold text-[#b42318]">
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
