"use client";

import { bdGeocode } from "@/data/bd-geocode";

export default function DistrictSelect({
  district,
  upazila,
  onDistrictChange,
  onUpazilaChange,
  disabled = false,
  required = false,
}) {
  const selectedDistrict = bdGeocode.find((item) => item.district === district);
  const upazilaList = selectedDistrict ? selectedDistrict.upazilas : [];

  return (
    <>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="district">
          District
        </label>
        <select
          id="district"
          name="district"
          value={district}
          disabled={disabled}
          required={required}
          onChange={(event) => {
            onDistrictChange(event.target.value);
            onUpazilaChange("");
          }}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] focus:border-[#b42318]"
        >
          <option value="">Select district</option>
          {bdGeocode.map((item) => (
            <option key={item.district} value={item.district}>
              {item.district}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="upazila">
          Upazila
        </label>
        <select
          id="upazila"
          name="upazila"
          value={upazila}
          disabled={disabled || !district}
          required={required}
          onChange={(event) => onUpazilaChange(event.target.value)}
          className="rounded-md border border-[#e8c5bf] px-3 py-2 outline-none disabled:bg-[#fff8f6] focus:border-[#b42318]"
        >
          <option value="">Select upazila</option>
          {upazilaList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
