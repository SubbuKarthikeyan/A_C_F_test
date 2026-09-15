"use client";

import React from "react";
import Link from "next/link";
import type { Feedback } from "@/types/feedback";

export interface FeedbackTableProps {
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

export function FeedbackTable({ feedback }: FeedbackTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Date
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Subject
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Customer
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Product
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Category
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Sentiment
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Severity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {feedback.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors hover:bg-slate-800/40"
              >
                {/* Date */}
                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-400 sm:px-6">
                  {formatFeedbackDate(item.receivedAt)}
                </td>

                {/* Subject */}
                <td className="px-4 py-3.5 sm:px-6">
                  <Link
                    href={`/dashboard/feedback/${item.id}`}
                    className="font-medium text-slate-200 transition-colors group-hover:text-indigo-400 hover:underline"
                  >
                    <span className="line-clamp-1 max-w-xs sm:max-w-sm md:max-w-md">
                      {item.subject}
                    </span>
                  </Link>
                </td>

                {/* Customer */}
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <div className="text-xs font-medium text-slate-300">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{item.email}</div>
                </td>

                {/* Product */}
                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-300 sm:px-6">
                  {item.product ? (
                    <span className="rounded bg-slate-800/80 px-2 py-0.5 font-medium text-slate-300">
                      {item.product}
                    </span>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>

                {/* Category */}
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <span
                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
                      CATEGORY_BADGES[item.category] || CATEGORY_BADGES.other
                    }`}
                  >
                    {item.category.replace("_", " ")}
                  </span>
                </td>

                {/* Sentiment */}
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <span
                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
                      SENTIMENT_BADGES[item.sentiment] ||
                      SENTIMENT_BADGES.neutral
                    }`}
                  >
                    {item.sentiment}
                  </span>
                </td>

                {/* Severity */}
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <span
                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium capitalize ${
                      SEVERITY_BADGES[item.severity] || SEVERITY_BADGES.low
                    }`}
                  >
                    {item.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
