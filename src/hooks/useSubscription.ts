"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export type SubscriptionTier = "free" | "plus" | "pro" | "academy";

const TIER_RANK: Record<SubscriptionTier, number> = {
  free: 0,
  plus: 1,
  pro: 2,
  academy: 3,
};

export function useSubscription() {
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchTier = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Not logged in — check localStorage fallback
      const stored = localStorage.getItem("tastebud_tier");
      if (stored && isValidTier(stored)) {
        setTier(stored as SubscriptionTier);
      } else {
        setTier("free");
      }
      setUserId(null);
      setLoading(false);
      return;
    }

    setUserId(user.id);

    // Fetch tier from Supabase profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("id", user.id)
      .single();

    const dbTier =
      profile?.subscription_tier && isValidTier(profile.subscription_tier)
        ? (profile.subscription_tier as SubscriptionTier)
        : "free";

    setTier(dbTier);
    localStorage.setItem("tastebud_tier", dbTier);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTier();
  }, [fetchTier]);

  const hasAccess = useCallback(
    (requiredTier: SubscriptionTier): boolean => {
      return TIER_RANK[tier] >= TIER_RANK[requiredTier];
    },
    [tier]
  );

  const startCheckout = useCallback(
    async (targetTier: "plus" | "pro" | "academy") => {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: targetTier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
      return data;
    },
    []
  );

  const openPortal = useCallback(async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    return data;
  }, []);

  return { tier, loading, userId, hasAccess, startCheckout, openPortal, refetch: fetchTier };
}

function isValidTier(value: string): value is SubscriptionTier {
  return ["free", "plus", "pro", "academy"].includes(value);
}
