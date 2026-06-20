export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8f6]">
      <div className="size-10 animate-spin rounded-full border-4 border-[#f0d3cf] border-t-[#b42318]" />
    </div>
  );
}
