"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DonationRequestForm from "@/app/components/donation/DonationRequestForm";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold text-[#241816]">
        Edit Donation Request
      </h1>
      <DonationRequestForm initialData={formData} requestId={params.id} />
    </main>
  );
}
