"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DistrictSelect from "@/app/components/common/DistrictSelect";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { bloodGroups } from "@/constants/bloodGroups";
import { api } from "@/lib/api";

const emptyForm = {
  recipientName: "",
  recipientDistrict: "",
  recipientUpazila: "",
  hospitalName: "",
  fullAddress: "",
  bloodGroup: "",
  donationDate: "",
  donationTime: "",
  requestMessage: "",
};

export default function EditDonationRequestPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadRequest() {
      try {
        const result = await api.getDonationRequestById(params.id);
        const request = result.data;
        setFormData({
          recipientName: request.recipientName || "",
          recipientDistrict: request.recipientDistrict || "",
          recipientUpazila: request.recipientUpazila || "",
          hospitalName: request.hospitalName || "",
          fullAddress: request.fullAddress || "",
          bloodGroup: request.bloodGroup || "",
          donationDate: request.donationDate || "",
          donationTime: request.donationTime || "",
          requestMessage: request.requestMessage || "",
        });
      } catch (error) {
        toast.error(error.message);
        router.push("/dashboard/my-donation-requests");
      } finally {
        setLoading(false);
      }
    }

    loadRequest();
  }, [params.id, router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      ["recipientName", "Recipient name"],
      ["recipientDistrict", "District"],
      ["recipientUpazila", "Upazila"],
      ["hospitalName", "Hospital name"],
      ["fullAddress", "Full address"],
      ["bloodGroup", "Blood group"],
      ["donationDate", "Donation date"],
      ["donationTime", "Donation time"],
      ["requestMessage", "Request message"],
    ];

    const missingField = requiredFields.find(
      ([field]) => !String(formData[field]).trim(),
    );

    if (missingField) {
      toast.error(`${missingField[1]} is required`);
      return;
    }

    try {
      setSaving(true);
      await api.updateDonationRequest(params.id, formData);
      toast.success("Request updated");
      router.push("/dashboard/my-donation-requests");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold text-[#241816]">
        Edit Donation Request
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
          />

          <DistrictSelect
            district={formData.recipientDistrict}
            upazila={formData.recipientUpazila}
            onDistrictChange={(value) =>
              setFormData((current) => ({
                ...current,
                recipientDistrict: value,
                recipientUpazila: "",
              }))
            }
            onUpazilaChange={(value) =>
              setFormData((current) => ({
                ...current,
                recipientUpazila: value,
              }))
            }
          />

          <FormInput
            label="Hospital Name"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
          />
          <FormInput
            label="Full Address"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
          />

          <div className="grid gap-2">
            <label
              className="text-sm font-semibold text-[#49312d]"
              htmlFor="bloodGroup"
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
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

          <FormInput
            label="Donation Date"
            name="donationDate"
            type="date"
            value={formData.donationDate}
            onChange={handleChange}
          />
          <FormInput
            label="Donation Time"
            name="donationTime"
            type="time"
            value={formData.donationTime}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4 grid gap-2">
          <label
            className="text-sm font-semibold text-[#49312d]"
            htmlFor="requestMessage"
          >
            Request Message
          </label>
          <textarea
            id="requestMessage"
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            rows={5}
            className="rounded-md border border-[#e8c5bf] px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
        >
          {saving ? "Updating..." : "Update Donation Request"}
        </button>
      </form>
    </main>
  );
}

function FormInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-[#49312d]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-md border border-[#e8c5bf] px-3 py-2"
      />
    </div>
  );
}
