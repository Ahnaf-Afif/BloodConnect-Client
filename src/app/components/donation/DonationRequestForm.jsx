"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { bloodGroups } from "@/constants/bloodGroups";
import { useAuthUser } from "@/hooks/useAuthUser";
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

export default function DonationRequestForm() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthUser();
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      await api.createDonationRequest(formData);
      toast.success("Donation request created");
      router.push("/dashboard/my-donation-requests");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput label="Requester Name" value={user?.name || ""} disabled />
        <FormInput label="Requester Email" value={user?.email || ""} disabled />

        <FormInput
          label="Recipient Name"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Patient name"
        />
        <FormInput
          label="Recipient District"
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          placeholder="Dhaka"
        />
        <FormInput
          label="Recipient Upazila"
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          placeholder="Savar"
        />
        <FormInput
          label="Hospital Name"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Dhaka Medical College Hospital"
        />
        <FormInput
          label="Full Address"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Zahir Raihan Road, Dhaka"
        />

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#49312d]" htmlFor="bloodGroup">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
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
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="requestMessage">
          Request Message
        </label>
        <textarea
          id="requestMessage"
          name="requestMessage"
          value={formData.requestMessage}
          onChange={handleChange}
          rows={5}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="Write why blood is needed"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white disabled:bg-[#d99b94]"
      >
        {saving ? "Creating..." : "Request Blood"}
      </button>
    </form>
  );
}

function FormInput({ label, name, value, onChange, disabled, placeholder, type = "text" }) {
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
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] disabled:text-[#674842] focus:border-[#b42318]"
      />
    </div>
  );
}
