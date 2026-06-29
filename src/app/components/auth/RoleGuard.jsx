"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function RoleGuard({ children, roles = [] }) {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && user && !roles.includes(user.role)) {
      router.push("/dashboard");
    }
  }, [loading, user, roles, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !roles.includes(user.role)) {
    return <LoadingSpinner />;
  }

  return children;
}
