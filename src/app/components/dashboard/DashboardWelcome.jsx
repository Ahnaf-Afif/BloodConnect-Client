export default function DashboardWelcome({ name }) {
  return (
    <header className="mb-8">
      <p className="text-sm font-semibold uppercase text-[#b42318]">
        Welcome back
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[#241816] md:text-4xl">
        Dashboard, {name}
      </h1>
    </header>
  );
}
