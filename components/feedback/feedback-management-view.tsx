"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getFeedback, FEEDBACK_STORAGE_KEY } from "@/lib/feedback";
import {
  filterFeedback,
  DEFAULT_FEEDBACK_FILTERS,
  type FeedbackFilters as FeedbackFiltersType,
} from "@/lib/feedback-filters";
import type { Category, Feedback } from "@/types/feedback";
import { LoadingState } from "@/components/ui/loading-state";
import { FeedbackFilters } from "./feedback-filters";
import { FeedbackList } from "./feedback-list";

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

export interface FeedbackManagementViewProps {
  initialCategory?: string;
}

const VALID_CATEGORIES: ReadonlySet<string> = new Set([
  "bug",
  "feature_request",
  "complaint",
  "praise",
  "question",
  "other",
]);

export function FeedbackManagementView({
  initialCategory,
}: FeedbackManagementViewProps) {
  const router = useRouter();
  const allFeedback = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const initialCat: Category | "all" =
    initialCategory && VALID_CATEGORIES.has(initialCategory)
      ? (initialCategory as Category)
      : "all";

  const [filters, setFilters] = useState<FeedbackFiltersType>(() => ({
    ...DEFAULT_FEEDBACK_FILTERS,
    category: initialCat,
  }));

  const handleFilterChange = <K extends keyof FeedbackFiltersType>(
    key: K,
    value: FeedbackFiltersType[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters(DEFAULT_FEEDBACK_FILTERS);
    // If URL has query params, reset path back to clean /dashboard/feedback
    router.replace("/dashboard/feedback");
  };

  if (allFeedback === null) {
    return <LoadingState message="Loading feedback records..." />;
  }

  const isFiltered =
    filters.search.trim() !== "" ||
    filters.category !== "all" ||
    filters.product !== "all" ||
    filters.sentiment !== "all" ||
    filters.severity !== "all" ||
    filters.fromDate !== "" ||
    filters.toDate !== "";

  const filteredFeedback = filterFeedback(allFeedback, filters);

  return (
    <div className="space-y-6">
      <FeedbackFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        isFiltered={isFiltered}
      />

      <FeedbackList
        feedback={filteredFeedback}
        totalCount={allFeedback.length}
        isFiltered={isFiltered}
        onResetFilters={handleReset}
      />
    </div>
  );
}
