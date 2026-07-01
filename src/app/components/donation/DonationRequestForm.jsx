"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import DistrictSelect from "@/app/components/common/DistrictSelect";
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

export default function DonationRequestForm({
  initialData = emptyForm,
  requestId = "",
}) {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthUser();
  const [formData, setFormData] = useState({
    ...emptyForm,
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(requestId);

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

      if (isEditing) {
        await api.updateDonationRequest(requestId, formData);
        toast.success("Donation request updated");
      } else {
        await api.createDonationRequest(formData);
        toast.success("Donation request created");
      }

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
      className="mt-8 rounded-lg bg-white p-6 ring-1 ring-[#f0d3cf]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {!isEditing && (
          <>
            <FormInput label="Requester Name" value={user?.name || ""} disabled />
            <FormInput
              label="Requester Email"
              value={user?.email || ""}
              disabled
            />
          </>
        )}

        <FormInput
          label="Recipient Name"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Patient name"
          maxLength={120}
          required
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
            setFormData((current) => ({ ...current, recipientUpazila: value }))
          }
          required
        />

        <FormInput
          label="Hospital Name"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Dhaka Medical College Hospital"
          maxLength={120}
          required
        />
        <FormInput
          label="Full Address"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Zahir Raihan Road, Dhaka"
          maxLength={1000}
          required
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
            required
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
          required
        />
        <FormInput
          label="Donation Time"
          name="donationTime"
          type="time"
          value={formData.donationTime}
          onChange={handleChange}
          required
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
          required
          maxLength={1000}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="Write why blood is needed"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded-md bg-[#b42318] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
            ? "Update Donation Request"
            : "Request Blood"}
      </button>
    </form>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
  type = "text",
  required = false,
  maxLength,
}) {
  return (
    <div className="grid gap-2">
      <label
        className="text-sm font-semibold text-[#49312d]"
        htmlFor={name}
      >
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
        required={required}
        maxLength={maxLength}
        className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] disabled:text-[#674842] focus:border-[#b42318]"
      />
    </div>
  );
}
