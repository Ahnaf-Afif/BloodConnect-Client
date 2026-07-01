import PrivateRouteClient from "@/app/components/auth/PrivateRouteClient";
import DashboardSidebar from "@/app/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRouteClient>
      <div className="min-h-screen bg-[#fff8f6] lg:flex">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </PrivateRouteClient>
  );
}
