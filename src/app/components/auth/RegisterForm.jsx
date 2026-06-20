"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { bloodGroups } from "@/constants/bloodGroups";
import { api } from "@/lib/api";

const emptyForm = {
  name: "",
  email: "",
  avatar: "",
  bloodGroup: "",
  district: "",
  upazila: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.register({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        password: formData.password,
      });

      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="Your full name"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#49312d]" htmlFor="district">
            District
          </label>
          <input
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
            placeholder="Dhaka"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#49312d]" htmlFor="upazila">
            Upazila
          </label>
          <input
            id="upazila"
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
            placeholder="Savar"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#49312d]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
            placeholder="******"
          />
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-semibold text-[#49312d]"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none focus:border-[#b42318]"
            placeholder="******"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#d99b94]"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-[#674842]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#b42318]">
          Login
        </Link>
      </p>
    </form>
  );
}
