import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#fff8f6] px-5 py-10">
      <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f0d3cf]">
        <h1 className="text-2xl font-bold text-[#241816]">Register</h1>
        <p className="mt-2 text-[#674842]">
          Create a donor account and help people find blood faster.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
