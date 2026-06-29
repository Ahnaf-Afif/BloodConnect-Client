"use client";

import { Suspense } from "react";

import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import PrivateRouteClient from "@/app/components/auth/PrivateRouteClient";
import FundingContent from "./FundingContent";

export default function FundingPage() {
  return (
    <PrivateRouteClient>
      <Suspense fallback={<LoadingSpinner />}>
        <FundingContent />
      </Suspense>
    </PrivateRouteClient>
  );
}
