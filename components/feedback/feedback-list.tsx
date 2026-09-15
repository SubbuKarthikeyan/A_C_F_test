"use client";

import React from "react";
import type { Feedback } from "@/types/feedback";
import { FeedbackTable } from "./feedback-table";
import { FeedbackCard } from "./feedback-card";

export interface FeedbackListProps {
  feedback: Feedback[];
  totalCount: number;
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function FeedbackList({
  feedback,
  totalCount,
  isFiltered,
  onResetFilters,
}: FeedbackListProps) {
  // Empty State 1: Database has zero records
  if (totalCount === 0) {
    return (
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
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.8-3.167c-.424-.353-.956-.546-1.506-.546H6.75A2.25 2.25 0 014.5 14.25v-8.5A2.25 2.25 0 016.75 3.5h10.5a2.25 2.25 0 012.25 2.25v2.761z"
          />
        </svg>
        <h3 className="text-sm font-semibold text-slate-200">
          No feedback available
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Feedback will appear here when records are available.
        </p>
      </div>
    );
  }

  // Empty State 2: Filters match zero records
  if (feedback.length === 0) {
    return (
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <h3 className="text-sm font-semibold text-slate-200">
          No feedback found
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          No feedback matching your current search or filter criteria. Try adjusting your filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Result Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-semibold text-slate-200">{feedback.length}</span>{" "}
          of <span className="font-semibold text-slate-200">{totalCount}</span>{" "}
          feedback items
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <FeedbackTable feedback={feedback} />
      </div>

      {/* Mobile Cards View */}
      <div className="space-y-3 md:hidden">
        {feedback.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
      </div>
    </div>
  );
}
