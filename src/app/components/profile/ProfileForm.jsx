"use client";

import { useEffect, useState } from "react";
import { uploadImageToImgBB } from "@/lib/imgbb";

import { toast } from "react-toastify";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import DistrictSelect from "@/app/components/common/DistrictSelect";
import { bloodGroups } from "@/constants/bloodGroups";
import { api } from "@/lib/api";

const emptyProfile = {
  name: "",
  email: "",
  avatar: "",
  bloodGroup: "",
  district: "",
  upazila: "",
};

export default function ProfileForm() {
  const [profile, setProfile] = useState(emptyProfile);
  const [avatarFile, setAvatarFile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await api.getProfile();
        setProfile({
          name: result.data.name || "",
          email: result.data.email || "",
          avatar: result.data.avatar || "",
          bloodGroup: result.data.bloodGroup || "",
          district: result.data.district || "",
          upazila: result.data.upazila || "",
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!profile.bloodGroup || !profile.district || !profile.upazila) {
      toast.error("Please complete your blood group and location details");
      return;
    }

    try {
      setSaving(true);
      let avatarUrl = profile.avatar;
      if (avatarFile) {
        avatarUrl = await uploadImageToImgBB(avatarFile);
      }

      const result = await api.updateProfile({
        name: profile.name,
        avatar: avatarUrl,
        bloodGroup: profile.bloodGroup,
        district: profile.district,
        upazila: profile.upazila,
      });

      setProfile({
        name: result.data.name || "",
        email: result.data.email || "",
        avatar: result.data.avatar || "",
        bloodGroup: result.data.bloodGroup || "",
        district: result.data.district || "",
        upazila: result.data.upazila || "",
      });
      setEditable(false);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]"
    >
      <div className="flex flex-col gap-4 border-b border-[#f0d3cf] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="size-16 rounded-full bg-[#fff3f0] bg-cover bg-center ring-2 ring-[#f0d3cf]"
            style={
              profile.avatar
                ? { backgroundImage: `url(${profile.avatar})` }
                : {}
            }
          />

          <div>
            <h2 className="text-xl font-bold text-[#241816]">{profile.name}</h2>
            <p className="text-sm text-[#674842]">{profile.email}</p>
          </div>
        </div>

        {!editable && (
          <button
            type="button"
            onClick={() => setEditable(true)}
            className="rounded-md border border-[#b42318] px-4 py-2 font-semibold text-[#b42318]"
          >
            Edit
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ProfileInput
          label="Name"
          name="name"
          value={profile.name}
          disabled={!editable}
          onChange={handleChange}
        />
        <ProfileInput
          label="Email"
          name="email"
          value={profile.email}
          disabled
          onChange={handleChange}
        />
        <div className="grid gap-2">
          <label
            className="text-sm font-semibold text-[#49312d]"
            htmlFor="avatar"
          >
            Avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(event) => setAvatarFile(event.target.files[0])}
            disabled={!editable}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] disabled:text-[#674842]"
          />
        </div>

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
            value={profile.bloodGroup}
            disabled={!editable}
            onChange={handleChange}
            className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] disabled:text-[#674842]"
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
          district={profile.district}
          upazila={profile.upazila}
          disabled={!editable}
          onDistrictChange={(value) =>
            setProfile((current) => ({ ...current, district: value, upazila: "" }))
          }
          onUpazilaChange={(value) =>
            setProfile((current) => ({ ...current, upazila: value }))
          }
        />
      </div>

      {editable && (
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-[#b42318] px-5 py-3 font-semibold text-white disabled:bg-[#d99b94]"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditable(false)}
            className="rounded-md border border-[#e8c5bf] px-5 py-3 font-semibold text-[#49312d]"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

function ProfileInput({ label, name, value, disabled, onChange }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-[#49312d]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] disabled:text-[#674842]"
      />
    </div>
  );
}
