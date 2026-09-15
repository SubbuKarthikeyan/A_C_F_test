"use client";

import React from "react";
import Link from "next/link";
import type { Feedback } from "@/types/feedback";

export interface RecentFeedbackProps {
  feedback: Feedback[];
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

export function RecentFeedback({ feedback }: RecentFeedbackProps) {
  return (
    <div
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
      role="region"
      aria-label="Recent Feedback List"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Feedback</h3>
        <p className="text-xs text-slate-400">
          Latest incoming customer submissions
        </p>
      </div>

      {feedback.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-xs text-slate-500">
          No recent feedback available.
        </div>
      ) : (
        <div className="divide-y divide-slate-800/80">
          {feedback.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/feedback/${item.id}`}
              className="flex flex-col justify-between gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center rounded-lg px-2 -mx-2 transition-colors hover:bg-slate-800/50"
            >
              <div className="min-w-0 pr-2">
                <p className="truncate text-xs font-semibold text-slate-200">
                  {item.subject}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {item.name} &bull; {formatFeedbackDate(item.receivedAt)}
                </p>
              </div>

              <div className="mt-1 flex shrink-0 items-center gap-1.5 sm:mt-0">
                <span
                  className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium capitalize ${
                    CATEGORY_BADGES[item.category] || CATEGORY_BADGES.other
                  }`}
                >
                  {item.category.replace("_", " ")}
                </span>
                <span
                  className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium capitalize ${
                    SENTIMENT_BADGES[item.sentiment] || SENTIMENT_BADGES.neutral
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
