import type { Category, Sentiment, Severity } from "@/types/feedback";

const CATEGORY_LABELS: Record<Category, string> = {
  bug: "Bug",
  feature_request: "Feature Request",
  complaint: "Complaint",
  praise: "Praise",
  question: "Question",
  other: "Other",
};

const SENTIMENT_LABELS: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
};

const SEVERITY_LABELS: Record<Severity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function formatCategoryLabel(category: Category | string): string {
  if (category in CATEGORY_LABELS) {
    return CATEGORY_LABELS[category as Category];
  }
  return category.replace(/_/g, " ");
}

export function formatSentimentLabel(sentiment: Sentiment | string): string {
  if (sentiment in SENTIMENT_LABELS) {
    return SENTIMENT_LABELS[sentiment as Sentiment];
  }
  return sentiment;
}

export function formatSeverityLabel(severity: Severity | string): string {
  if (severity in SEVERITY_LABELS) {
    return SEVERITY_LABELS[severity as Severity];
  }
  return severity;
}

export function formatFeedbackDateTime(dateStr: string): string {
  if (!dateStr) return "Not Specified";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}
