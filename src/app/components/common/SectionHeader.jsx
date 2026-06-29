"use client";

export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="mb-8 py-2">
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 mb-4">
          <span className="text-lg">{badge.icon}</span>
          <p className="text-sm font-semibold text-[#b42318]">{badge.text}</p>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#241816] via-[#b42318] to-[#8a1810] bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[#674842] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
