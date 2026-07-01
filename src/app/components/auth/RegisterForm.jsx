"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaDroplet } from "react-icons/fa6";
import { toast } from "react-toastify";

import DistrictSelect from "@/app/components/common/DistrictSelect";
import { bloodGroups } from "@/constants/bloodGroups";
import { api } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/imgbb";

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
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!avatarFile) {
      toast.error("Please choose an avatar");
      return;
    }

    if (!formData.bloodGroup || !formData.district || !formData.upazila) {
      toast.error("Please complete your blood group and location details");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const avatarUrl = await uploadImageToImgBB(avatarFile);

      await api.register({
        name: formData.name,
        email: formData.email,
        avatar: avatarUrl,
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
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div className="rounded-2xl bg-linear-to-r from-[#fff5f3] to-[#fff8f6] p-4 ring-1 ring-[#f0d3cf]">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#b42318]">
          <FaDroplet /> Join the community
        </p>
        <p className="mt-1 text-sm text-[#674842]">
          Create an account to share help, request support, and connect with
          nearby donors.
        </p>
      </div>

      <div className="grid gap-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
          placeholder="Your full name"
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
          htmlFor="avatar"
        >
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(event) => setAvatarFile(event.target.files[0])}
          className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <label
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
            htmlFor="bloodGroup"
          >
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
          >
            <option value="">Select</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <DistrictSelect
          district={formData.district}
          upazila={formData.upazila}
          onDistrictChange={(value) =>
            setFormData((current) => ({
              ...current,
              district: value,
              upazila: "",
            }))
          }
          onUpazilaChange={(value) =>
            setFormData((current) => ({ ...current, upazila: value }))
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
            placeholder="******"
          />
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#49312d]"
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
            className="rounded-xl border-2 border-[#e8c5bf] bg-white px-4 py-3 outline-none transition focus:border-[#b42318] focus:ring-4 focus:ring-[#b42318]/10"
            placeholder="******"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#b42318] to-[#8a1810] px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Creating account..." : "Create account"}
        <FaArrowRight />
      </button>

      <p className="text-center text-sm text-[#674842]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#b42318] transition hover:text-[#8a1810]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
