"use client";

import React, { useSyncExternalStore } from "react";
import { getFeedback, FEEDBACK_STORAGE_KEY } from "@/lib/feedback";
import { calculateFeedbackKpis } from "@/lib/dashboard";
import type { Feedback } from "@/types/feedback";
import { LoadingState } from "@/components/ui/loading-state";
import { KpiGrid } from "./kpi-grid";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("feedback-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("feedback-updated", callback);
  };
}

let cachedRaw = "__initial__";
let cachedFeedback: Feedback[] = [];

function getClientSnapshot(): Feedback[] {
  if (typeof window === "undefined") return cachedFeedback;
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY) ?? "__none__";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedFeedback = getFeedback();
    }
  } catch {
    cachedFeedback = getFeedback();
  }
  return cachedFeedback;
}

function getServerSnapshot(): Feedback[] | null {
  return null;
}

export function DashboardView() {
  const feedback = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (feedback === null) {
    return <LoadingState message="Loading dashboard..." />;
  }

  const kpis = calculateFeedbackKpis(feedback);

  return (
    <div className="space-y-6">
      {/* Dynamic KPI Cards Grid */}
      <KpiGrid kpis={kpis} />

      {/* Phase 6 Analytics Placeholder */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-8 text-center">
        <p className="text-sm font-medium text-slate-300">Analytics & Visualizations</p>
        <p className="mt-1 text-xs text-slate-500">
          Detailed feedback trends, sentiment breakdowns, and category charts will appear here in Phase 6.
        </p>
      </div>
    </div>
  );
}
