"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function PrivateRouteClient({ children }) {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return children;
}
