import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(180,35,24,0.08),_transparent_45%),linear-gradient(135deg,_#fff8f6_0%,_#ffffff_100%)] px-5 py-10">
      <section className="mx-auto max-w-md rounded-[28px] bg-white/95 p-8 shadow-2xl ring-1 ring-[#f0d3cf] backdrop-blur">
        <div className="rounded-2xl bg-gradient-to-r from-[#b42318] to-[#8a1810] p-5 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold">Login to BloodConnect</h1>
          <p className="mt-2 text-sm text-white/85">
            Access your dashboard and keep every donation request moving forward.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
