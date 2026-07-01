"use client";

import { useState } from "react";
import { FaClock, FaEnvelope, FaPhone } from "react-icons/fa6";
import { toast } from "react-toastify";

import { api } from "@/lib/api";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSending(true);
      await api.sendContact(form);
      toast.success("Message sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-12 border-y border-[#f0d3cf] py-16">
      <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-[#241816]">Get in Touch</h2>
            <p className="mt-4 max-w-lg text-[#674842]">
              Have questions? We&apos;re here to help with donor searches and
              blood donation requests.
            </p>
            <div className="mt-7 grid gap-4 text-sm text-[#49312d]">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#b42318]" />
                <p>+880 1234 567890</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#b42318]" />
                <p>support@bloodconnect.com</p>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-[#b42318]" />
                <p>24/7 Available</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-lg bg-white p-6 ring-1 ring-[#f0d3cf]"
          >
            <label className="text-sm font-semibold text-[#49312d]" htmlFor="contactName">
              Name
            </label>
            <input
              id="contactName"
              name="name"
              required
              maxLength={80}
              value={form.name}
              onChange={handleChange}
              className="rounded-md border border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none"
            />
            <label className="text-sm font-semibold text-[#49312d]" htmlFor="contactEmail">
              Email
            </label>
            <input
              id="contactEmail"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="rounded-md border border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none"
            />
            <label className="text-sm font-semibold text-[#49312d]" htmlFor="contactMessage">
              Message
            </label>
            <textarea
              id="contactMessage"
              name="message"
              required
              maxLength={1000}
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="resize-none rounded-md border border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-md bg-[#b42318] px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
      </div>
    </section>
  );
}
