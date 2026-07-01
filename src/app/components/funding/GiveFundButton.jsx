"use client";

import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function GiveFundButton() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [paying, setPaying] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setPaying(true);
      const result = await api.createFundCheckout(Number(amount));

      if (result.data.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      toast.error(error.message);
      setPaying(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white"
      >
        <FaHandHoldingHeart />
        Give Fund
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#241816]">Give Fund</h2>
            <p className="mt-2 text-sm text-[#674842]">
              Enter an amount to continue to Stripe.
            </p>

            <label
              className="mt-5 block text-sm font-semibold text-[#49312d]"
              htmlFor="fundAmount"
            >
              Amount (USD)
            </label>
            <input
              id="fundAmount"
              type="number"
              min="1"
              max="10000"
              step="0.01"
              required
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="mt-1 w-full rounded-md border border-[#e8c5bf] px-3 py-2"
              placeholder="10"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={paying}
                className="rounded-md bg-[#b42318] px-4 py-2 font-semibold text-white disabled:opacity-60"
              >
                {paying ? "Opening Stripe..." : "Continue"}
              </button>
              <button
                type="button"
                disabled={paying}
                onClick={() => {
                  setOpen(false);
                  setAmount("");
                }}
                className="rounded-md border border-[#e8c5bf] px-4 py-2 font-semibold text-[#49312d]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
