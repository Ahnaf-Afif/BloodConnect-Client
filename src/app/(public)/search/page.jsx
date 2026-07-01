"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DistrictSelect from "@/app/components/common/DistrictSelect";
import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import Navbar from "@/app/components/layout/Navbar";
import { bloodGroups } from "@/constants/bloodGroups";
import { api } from "@/lib/api";

export default function SearchPage() {
  const [form, setForm] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (form.bloodGroup) params.set("bloodGroup", form.bloodGroup);
      if (form.district) params.set("district", form.district);
      if (form.upazila) params.set("upazila", form.upazila);

      const query = params.toString() ? `?${params.toString()}` : "";
      const result = await api.searchDonors(query);
      setDonors(result.data);
      setSearched(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setForm({ bloodGroup: "", district: "", upazila: "" });
    setDonors([]);
    setSearched(false);
  }

  return (
    <main className="min-h-screen bg-[#fff8f6]">
      <section className="mx-auto max-w-6xl px-5 py-6">
        <Navbar />

        <div className="py-10">
          <h1 className="text-3xl font-bold text-[#241816]">Search Donors</h1>
          <p className="mt-2 text-[#674842]">
            Find active donors by blood group and location.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label
                  className="text-sm font-semibold text-[#49312d]"
                  htmlFor="bloodGroup"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  value={form.bloodGroup}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      bloodGroup: event.target.value,
                    }))
                  }
                  className="rounded-md border border-[#e8c5bf] px-3 py-2"
                >
                  <option value="">Select</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <DistrictSelect
                district={form.district}
                upazila={form.upazila}
                onDistrictChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    district: value,
                    upazila: "",
                  }))
                }
                onUpazilaChange={(value) =>
                  setForm((current) => ({ ...current, upazila: value }))
                }
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
              >
                {loading ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md border border-[#e8c5bf] px-5 py-3 font-semibold text-[#49312d]"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="mt-8">
            {loading && <LoadingSpinner />}

            {!loading && searched && donors.length === 0 && (
              <EmptyState title="No donors found" text="Try another search." />
            )}

            {!loading && donors.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {donors.map((donor) => (
                  <article
                    key={donor._id}
                    className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0d3cf]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-12 rounded-full bg-[#fff3f0] bg-cover bg-center"
                        style={
                          donor.avatar
                            ? { backgroundImage: `url(${donor.avatar})` }
                            : {}
                        }
                      />
                      <div>
                        <h2 className="font-bold text-[#241816]">
                          {donor.name}
                        </h2>
                        <p className="text-sm text-[#674842]">{donor.email}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#49312d]">
                      Blood: <strong>{donor.bloodGroup}</strong>
                    </p>
                    <p className="text-sm text-[#49312d]">
                      {donor.upazila}, {donor.district}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
