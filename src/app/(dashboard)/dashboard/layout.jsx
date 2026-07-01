import PrivateRouteClient from "@/app/components/auth/PrivateRouteClient";
import DashboardSidebar from "@/app/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRouteClient>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(180,35,24,0.08),transparent_45%),linear-gradient(135deg,#fff8f6_0%,#ffffff_100%)] lg:flex">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </PrivateRouteClient>
  );
}
