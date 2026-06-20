export async function uploadImageToImgBB(imageFile) {
  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!imgbbKey) {
    throw new Error("Image upload key is missing");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.url;
}
