function buildPlaceholderAvatar(label = "Avatar") {
  const initials =
    (label || "Avatar")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "A";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
      <rect width="160" height="160" rx="80" fill="#fff3f0" />
      <circle cx="80" cy="64" r="32" fill="#b42318" />
      <path d="M36 132c8-24 32-36 44-36s36 12 44 36" fill="#b42318" />
      <text x="80" y="152" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#241816">${initials}</text>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export async function uploadImageToImgBB(imageFile) {
  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!imgbbKey || !imageFile) {
    return buildPlaceholderAvatar(imageFile?.name || "Avatar");
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  } catch {
    return buildPlaceholderAvatar(imageFile?.name || "Avatar");
  }
}
