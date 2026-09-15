import React from "react";
import type { Category, Sentiment, Severity } from "@/types/feedback";
import {
  formatCategoryLabel,
  formatSentimentLabel,
  formatSeverityLabel,
} from "@/lib/feedback-formatters";

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

export interface FeedbackStatusBadgesProps {
  category: Category;
  sentiment: Sentiment;
  severity: Severity;
  className?: string;
}

export function FeedbackStatusBadges({
  category,
  sentiment,
  severity,
  className = "",
}: FeedbackStatusBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Category Badge */}
      <span
        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
          CATEGORY_BADGES[category] || CATEGORY_BADGES.other
        }`}
        title={`Category: ${formatCategoryLabel(category)}`}
      >
        <span className="text-slate-500 mr-1.5 font-normal">Category:</span>
        {formatCategoryLabel(category)}
      </span>

      {/* Sentiment Badge */}
      <span
        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
          SENTIMENT_BADGES[sentiment] || SENTIMENT_BADGES.neutral
        }`}
        title={`Sentiment: ${formatSentimentLabel(sentiment)}`}
      >
        <span className="text-slate-500 mr-1.5 font-normal">Sentiment:</span>
        {formatSentimentLabel(sentiment)}
      </span>

      {/* Severity Badge */}
      <span
        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
          SEVERITY_BADGES[severity] || SEVERITY_BADGES.low
        }`}
        title={`Severity: ${formatSeverityLabel(severity)}`}
      >
        <span className="text-slate-500 mr-1.5 font-normal">Severity:</span>
        {formatSeverityLabel(severity)}
      </span>
    </div>
  );
}
