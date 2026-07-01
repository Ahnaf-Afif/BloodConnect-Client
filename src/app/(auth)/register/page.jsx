import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(180,35,24,0.08),transparent_45%),linear-gradient(135deg,#fff8f6_0%,#ffffff_100%)] px-5 py-10">
      <section className="mx-auto max-w-4xl rounded-[28px] bg-white/95 p-8 shadow-2xl ring-1 ring-[#f0d3cf] backdrop-blur">
        <div className="rounded-2xl bg-linear-to-r from-[#b42318] to-[#8a1810] p-5 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            Create account
          </p>
          <h1 className="mt-2 text-3xl font-bold">Join BloodConnect</h1>
          <p className="mt-2 text-sm text-white/85">
            Register as a donor and help match urgent blood requests faster.
          </p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
