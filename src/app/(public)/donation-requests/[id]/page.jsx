"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import PrivateRouteClient from "@/app/components/auth/PrivateRouteClient";
import DonateConfirmModal from "@/app/components/donation/DonateConfirmModal";
import DonationStatusBadge from "@/app/components/donation/DonationStatusBadge";
import { api } from "@/lib/api";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function DonationRequestDetailsPage() {
  return (
    <PrivateRouteClient>
      <DetailsContent />
    </PrivateRouteClient>
  );
}

function DetailsContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthUser();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    async function loadRequest() {
      try {
        const result = await api.getDonationRequestById(params.id);
        setRequest(result.data);
      } catch (error) {
        toast.error(error.message);
        router.push("/donation-requests");
      } finally {
        setLoading(false);
      }
    }

    loadRequest();
  }, [params.id, router]);

  async function handleDonate() {
    try {
      setDonating(true);
      await api.confirmDonation(params.id);
      toast.success("You confirmed to donate blood");
      setShowModal(false);
      const result = await api.getDonationRequestById(params.id);
      setRequest(result.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDonating(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!request) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fff8f6] px-5 py-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#241816]">Request Details</h1>

        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]">
          <div className="grid gap-3 text-sm text-[#49312d]">
            <p><strong>Requester:</strong> {request.requesterName}</p>
            <p><strong>Requester Email:</strong> {request.requesterEmail}</p>
            <p><strong>Recipient:</strong> {request.recipientName}</p>
            <p><strong>Location:</strong> {request.recipientUpazila}, {request.recipientDistrict}</p>
            <p><strong>Hospital:</strong> {request.hospitalName}</p>
            <p><strong>Address:</strong> {request.fullAddress}</p>
            <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
            <p><strong>Date:</strong> {request.donationDate}</p>
            <p><strong>Time:</strong> {request.donationTime}</p>
            <div className="flex items-center gap-2">
              <strong>Status:</strong>
              <DonationStatusBadge status={request.donationStatus} />
            </div>
            <p><strong>Message:</strong> {request.requestMessage}</p>
            {request.donationStatus === "inprogress" && (
              <>
                <p><strong>Donor Name:</strong> {request.donorName}</p>
                <p><strong>Donor Email:</strong> {request.donorEmail}</p>
              </>
            )}
          </div>

          {request.donationStatus === "pending" && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-6 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
            >
              Donate
            </button>
          )}
        </div>
      </section>

      <DonateConfirmModal
        open={showModal}
        user={user}
        loading={donating}
        onConfirm={handleDonate}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
