"use client";

import React from "react";
import Link from "next/link";
import type { Feedback } from "@/types/feedback";

export interface FeedbackCardProps {
  feedback: Feedback;
}

const CATEGORY_BADGES: Record<string, string> = {
  bug: "text-rose-400 bg-rose-950/40 border-rose-800/60",
  feature_request: "text-amber-400 bg-amber-950/40 border-amber-800/60",
  complaint: "text-orange-400 bg-orange-950/40 border-orange-800/60",
  praise: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
  question: "text-cyan-400 bg-cyan-950/40 border-cyan-800/60",
  other: "text-slate-400 bg-slate-800/60 border-slate-700/60",
};

const SENTIMENT_BADGES: Record<string, string> = {
  positive: "text-emerald-400 bg-emerald-950/30 border-emerald-800/50",
  neutral: "text-slate-400 bg-slate-800/40 border-slate-700/50",
  negative: "text-rose-400 bg-rose-950/30 border-rose-800/50",
};

const SEVERITY_BADGES: Record<string, string> = {
  low: "text-emerald-400 bg-emerald-950/30 border-emerald-800/50",
  medium: "text-amber-400 bg-amber-950/30 border-amber-800/50",
  high: "text-orange-400 bg-orange-950/30 border-orange-800/50",
  critical: "text-rose-400 bg-rose-950/30 border-rose-800/50",
};

function formatFeedbackDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/80">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/dashboard/feedback/${feedback.id}`}
          className="group text-sm font-semibold text-slate-100 hover:text-indigo-400"
        >
          <span className="line-clamp-2">{feedback.subject}</span>
        </Link>
        <span className="shrink-0 text-[11px] text-slate-400">
          {formatFeedbackDate(feedback.receivedAt)}
        </span>
      </div>

      <p className="mt-1 line-clamp-2 text-xs text-slate-400">
        {feedback.body}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-400">
        <div className="min-w-0 pr-2">
          <p className="truncate font-medium text-slate-300">{feedback.name}</p>
          <p className="truncate text-[11px] text-slate-500">{feedback.email}</p>
        </div>

        {feedback.product && (
          <span className="shrink-0 rounded bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300">
            {feedback.product}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
            CATEGORY_BADGES[feedback.category] || CATEGORY_BADGES.other
          }`}
        >
          {feedback.category.replace("_", " ")}
        </span>
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
            SENTIMENT_BADGES[feedback.sentiment] || SENTIMENT_BADGES.neutral
          }`}
        >
          {feedback.sentiment}
        </span>
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
            SEVERITY_BADGES[feedback.severity] || SEVERITY_BADGES.low
          }`}
        >
          {feedback.severity}
        </span>
      </div>
    </div>
  );
}
