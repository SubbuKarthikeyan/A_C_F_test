"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { getFeedback, FEEDBACK_STORAGE_KEY } from "@/lib/feedback";
import type { Feedback } from "@/types/feedback";
import { LoadingState } from "@/components/ui/loading-state";
import { FeedbackStatusBadges } from "./feedback-status-badges";
import { FeedbackMetadata } from "./feedback-metadata";
import { FeedbackMessage } from "./feedback-message";

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

export interface FeedbackDetailViewProps {
  id: string;
}

export function FeedbackDetailView({ id }: FeedbackDetailViewProps) {
  const allFeedback = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (allFeedback === null) {
    return <LoadingState message="Loading feedback details..." />;
  }

  const feedback = allFeedback.find((item) => item.id === id);

  if (!feedback) {
    return (
      <div className="space-y-6">
        <div>
          <Link
            href="/dashboard/feedback"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Feedback
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40 py-16 px-4 text-center">
          <svg
            className="h-10 w-10 text-slate-600 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-base font-semibold text-slate-200">
            Feedback Not Found
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            The feedback record you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/dashboard/feedback"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Return to Feedback Management
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Back Navigation Link */}
      <div>
        <Link
          href="/dashboard/feedback"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white group"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Feedback
        </Link>
      </div>

      {/* 2. Feedback Header Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-words">
            {feedback.subject}
          </h1>
        </div>

        <FeedbackStatusBadges
          category={feedback.category}
          sentiment={feedback.sentiment}
          severity={feedback.severity}
        />
      </div>

      {/* 3. Feedback Metadata Details */}
      <FeedbackMetadata feedback={feedback} />

      {/* 4. Full Message Body */}
      <FeedbackMessage body={feedback.body} />
    </div>
  );
}
