import React from "react";
import type { Feedback } from "@/types/feedback";
import { formatFeedbackDateTime } from "@/lib/feedback-formatters";

export interface FeedbackMetadataProps {
  feedback: Feedback;
}

export function FeedbackMetadata({ feedback }: FeedbackMetadataProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* 1. Sender Information Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Sender Information
        </h3>
        <dl className="mt-4 space-y-3 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-slate-500">Customer Name</dt>
            <dd className="font-medium text-slate-200">
              {feedback.name || "Anonymous"}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 border-t border-slate-800/60 pt-3">
            <dt className="text-slate-500">Email Address</dt>
            <dd className="font-medium text-slate-200 break-all">
              {feedback.email || "Not Provided"}
            </dd>
          </div>
        </dl>
      </div>

      {/* 2. Product & Feature Context */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Product & Classification Context
        </h3>
        <dl className="mt-4 space-y-3 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-slate-500">Product</dt>
            <dd className="font-medium text-slate-200">
              {feedback.product ? (
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-200">
                  {feedback.product}
                </span>
              ) : (
                <span className="text-slate-500 italic">Not Specified</span>
              )}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 border-t border-slate-800/60 pt-3">
            <dt className="text-slate-500">Feature Area</dt>
            <dd className="font-medium text-slate-200">
              {feedback.feature ? (
                feedback.feature
              ) : (
                <span className="text-slate-500 italic">Not Specified</span>
              )}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 border-t border-slate-800/60 pt-3">
            <dt className="text-slate-500">Reported Issue</dt>
            <dd className="font-medium text-slate-200">
              {feedback.issue ? (
                feedback.issue
              ) : (
                <span className="text-slate-500 italic">Not Specified</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* 3. Submission Metadata Info */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="block text-xs font-medium text-slate-500">
              Received Date & Time
            </span>
            <span className="mt-1 block text-xs sm:text-sm font-medium text-slate-200">
              {formatFeedbackDateTime(feedback.receivedAt)}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium text-slate-500">
              Feedback Record ID
            </span>
            <code className="mt-1 inline-block rounded bg-slate-950/80 px-2 py-1 font-mono text-[11px] text-slate-400 border border-slate-800">
              {feedback.id}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
