"use client";

import { useState } from "react";
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
    <section className="py-16 mt-12">
      <div className="rounded-3xl bg-gradient-to-r from-[#b42318] via-[#8a1810] to-[#b42318] p-12 md:p-16 shadow-2xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-white/90 text-lg mb-6">Have questions? We're here to help you find the right donors or manage your blood donation requests.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <p className="text-white/90">+880 1234 567890</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <p className="text-white/90">support@bloodconnect.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <p className="text-white/90">24/7 Available</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 bg-white/95 backdrop-blur p-8 rounded-2xl shadow-lg"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="rounded-lg border-2 border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none transition-colors"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="rounded-lg border-2 border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none transition-colors"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your message"
              className="rounded-lg border-2 border-[#e8c5bf] px-4 py-3 focus:border-[#b42318] focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-lg bg-gradient-to-r from-[#b42318] to-[#8a1810] px-6 py-3 font-bold text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
