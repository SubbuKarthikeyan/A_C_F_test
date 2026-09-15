"use client";

import React, { useSyncExternalStore } from "react";
import { getFeedback, FEEDBACK_STORAGE_KEY } from "@/lib/feedback";
import { calculateFeedbackKpis } from "@/lib/dashboard";
import {
  calculateCategoryDistribution,
  calculateProductDistribution,
  calculateSentimentDistribution,
  calculateSeverityDistribution,
  calculateFeedbackTrend,
  calculateTopIssues,
  getRecentFeedback,
} from "@/lib/analytics";
import type { Feedback } from "@/types/feedback";
import { LoadingState } from "@/components/ui/loading-state";
import { KpiGrid } from "./kpi-grid";
import { FeedbackByCategory } from "@/components/charts/feedback-by-category";
import { FeedbackByProduct } from "@/components/charts/feedback-by-product";
import { SentimentDistribution } from "@/components/charts/sentiment-distribution";
import { SeverityDistribution } from "@/components/charts/severity-distribution";
import { FeedbackTrend } from "@/components/charts/feedback-trend";
import { TopIssues } from "./top-issues";
import { RecentFeedback } from "./recent-feedback";

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
  const categoryData = calculateCategoryDistribution(feedback);
  const productData = calculateProductDistribution(feedback);
  const sentimentData = calculateSentimentDistribution(feedback);
  const severityData = calculateSeverityDistribution(feedback);
  const trendData = calculateFeedbackTrend(feedback);
  const topIssues = calculateTopIssues(feedback, 5);
  const recentItems = getRecentFeedback(feedback, 5);

  return (
    <div className="space-y-6">
      {/* 1. Dynamic KPI Cards Grid */}
      <KpiGrid kpis={kpis} />

      {/* 2. Category & Product Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FeedbackByCategory data={categoryData} />
        <FeedbackByProduct data={productData} />
      </div>

      {/* 3. Sentiment & Severity Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SentimentDistribution data={sentimentData} />
        <SeverityDistribution data={severityData} />
      </div>

      {/* 4. Feedback Trend Over Time */}
      <FeedbackTrend data={trendData} />

      {/* 5. Top Issues & Recent Feedback */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopIssues issues={topIssues} />
        <RecentFeedback feedback={recentItems} />
      </div>
    </div>
  );
}
