"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import Navbar from "@/app/components/layout/Navbar";
import { api } from "@/lib/api";

export default function FundingContent() {
  const searchParams = useSearchParams();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [paying, setPaying] = useState(false);

  async function loadFunds() {
    try {
      const result = await api.getFunds();
      setFunds(result.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api
      .getFunds()
      .then((result) => setFunds(result.data))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "true" && sessionId) {
      api
        .confirmFund(sessionId)
        .then(() => {
          toast.success("Thank you for your donation");
          return api.getFunds();
        })
        .then((result) => setFunds(result.data))
        .catch((error) => toast.error(error.message));
    }
  }, [searchParams]);

  async function handleGiveFund(event) {
    event.preventDefault();

    try {
      setPaying(true);
      const result = await api.createFundCheckout(Number(amount));

      if (result.data.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPaying(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f6]">
      <section className="mx-auto max-w-6xl px-5 py-6">
        <Navbar />

        <div className="py-10">
          <h1 className="text-3xl font-bold text-[#241816]">Funding</h1>
          <p className="mt-2 text-[#674842]">
            Support blood donation organizations with a small fund.
          </p>

          <form
            onSubmit={handleGiveFund}
            className="mt-6 flex flex-wrap items-end gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0d3cf]"
          >
            <div>
              <label className="text-sm font-semibold text-[#49312d]" htmlFor="amount">
                Amount (USD)
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="mt-1 block rounded-md border border-[#e8c5bf] px-3 py-2"
                placeholder="10"
              />
            </div>
            <button
              type="submit"
              disabled={paying}
              className="rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
            >
              {paying ? "Processing..." : "Give Fund"}
            </button>
          </form>

          <div className="mt-8">
            {loading ? (
              <LoadingSpinner />
            ) : funds.length === 0 ? (
              <EmptyState title="No funds yet" text="Be the first to donate." />
            ) : (
              <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-[#f0d3cf]">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-[#f0d3cf] bg-[#fff3f0]">
                    <tr>
                      <th className="px-4 py-3">Donor Name</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((fund) => (
                      <tr key={fund._id} className="border-b border-[#f0d3cf]">
                        <td className="px-4 py-3">{fund.userName}</td>
                        <td className="px-4 py-3">${fund.amount}</td>
                        <td className="px-4 py-3">
                          {new Date(fund.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
