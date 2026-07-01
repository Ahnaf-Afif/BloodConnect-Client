import Image from "next/image";
import Link from "next/link";
import {
  FaClipboardList,
  FaHandHoldingHeart,
  FaMagnifyingGlassLocation,
} from "react-icons/fa6";

import ContactSection from "@/app/components/home/ContactSection";
import FeaturedSection from "@/app/components/home/FeaturedSection";
import Footer from "@/app/components/layout/Footer";
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
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-2">
          <Navbar />
        </div>
      </header>

      <section className="relative h-[72svh] min-h-[540px] max-h-[720px] overflow-hidden">
        <Image
          src="/images/blood-donation-hero.png"
          alt="A donor giving blood in a clinic"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-white/65 md:hidden" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase text-[#b42318]">
              Find help. Give hope.
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-[#241816] sm:text-5xl md:text-6xl">
              BloodConnect
            </h1>
            <p className="mt-5 text-xl font-semibold text-[#241816]">
              Find nearby donors when every minute matters.
            </p>
            <p className="mt-3 max-w-lg leading-7 text-[#674842]">
              Search by blood group and location, respond to urgent requests,
              or register as a donor in Bangladesh.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#b42318] px-6 py-3 font-semibold text-white"
              >
                <FaHandHoldingHeart />
                Join as a donor
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b42318] bg-white px-6 py-3 font-semibold text-[#b42318]"
              >
                <FaMagnifyingGlassLocation />
                Search donors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5">
        <FeaturedSection />

        <section className="py-20">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase text-[#b42318]">
              One shared place
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#241816]">
              How BloodConnect Helps
            </h2>
            <p className="mt-3 max-w-2xl text-[#674842]">
              Simple tools for donors, requesters, volunteers, and admins.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="h-full rounded-lg border border-[#ecd7d2] bg-white p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-md bg-red-50 text-[#b42318]">
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="mt-5 text-xl font-bold text-[#241816]">
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
      </div>

      <Footer />
    </main>
  );
}
