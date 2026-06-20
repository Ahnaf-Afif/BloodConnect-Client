import PrivateRouteClient from "@/app/components/auth/PrivateRouteClient";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRouteClient>
      <div className="min-h-screen bg-[#fff8f6]">{children}</div>
    </PrivateRouteClient>
  );
}
