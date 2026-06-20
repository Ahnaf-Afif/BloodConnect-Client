"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await api.me();
        setUser(result.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading };
}
