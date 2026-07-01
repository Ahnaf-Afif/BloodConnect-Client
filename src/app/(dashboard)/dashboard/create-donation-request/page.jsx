import DonationRequestForm from "@/app/components/donation/DonationRequestForm";
import RoleGuard from "@/app/components/auth/RoleGuard";

export default function CreateDonationRequestPage() {
  return (
    <RoleGuard roles={["donor"]}>
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-bold text-[#241816]">
          Create Donation Request
        </h1>
        <p className="mt-2 text-[#674842]">
          Share recipient and hospital details so donors can respond quickly.
        </p>
        <DonationRequestForm />
      </main>
    </RoleGuard>
  );
}
