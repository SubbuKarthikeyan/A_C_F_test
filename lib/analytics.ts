import type {
  Category,
  Feedback,
  Product,
  Sentiment,
  Severity,
} from "@/types/feedback";

export interface DistributionItem {
  label: string;
  key: string;
  count: number;
  color?: string;
}

export interface TrendItem {
  date: string;
  displayDate: string;
  count: number;
}

export interface IssueCount {
  issue: string;
  count: number;
}

const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  bug: { label: "Bug", color: "#f43f5e" },
  feature_request: { label: "Feature Request", color: "#f59e0b" },
  complaint: { label: "Complaint", color: "#ea580c" },
  praise: { label: "Praise", color: "#10b981" },
  question: { label: "Question", color: "#06b6d4" },
  other: { label: "Other", color: "#94a3b8" },
};

const PRODUCT_META: Record<Product | "null", { label: string; color: string }> = {
  "Chat Interface": { label: "Chat Interface", color: "#38bdf8" },
  Dashboard: { label: "Dashboard", color: "#818cf8" },
  "E-commerce": { label: "E-commerce", color: "#a855f7" },
  null: { label: "Not Specified", color: "#64748b" },
};

const SENTIMENT_META: Record<Sentiment, { label: string; color: string }> = {
  positive: { label: "Positive", color: "#10b981" },
  neutral: { label: "Neutral", color: "#94a3b8" },
  negative: { label: "Negative", color: "#f43f5e" },
};

const SEVERITY_META: Record<Severity, { label: string; color: string }> = {
  low: { label: "Low", color: "#10b981" },
  medium: { label: "Medium", color: "#f59e0b" },
  high: { label: "High", color: "#ea580c" },
  critical: { label: "Critical", color: "#f43f5e" },
};

/**
 * Calculates feedback count grouped by category.
 */
export function calculateCategoryDistribution(
  feedback: Feedback[] = []
): DistributionItem[] {
  const counts: Record<Category, number> = {
    bug: 0,
    feature_request: 0,
    complaint: 0,
    praise: 0,
    question: 0,
    other: 0,
  };

  for (const item of feedback) {
    if (item.category in counts) {
      counts[item.category] += 1;
    } else {
      counts.other += 1;
    }
  }

  return (Object.keys(CATEGORY_META) as Category[]).map((cat) => ({
    key: cat,
    label: CATEGORY_META[cat].label,
    count: counts[cat],
    color: CATEGORY_META[cat].color,
  }));
}

/**
 * Calculates feedback count grouped by product, properly representing null products as "Not Specified".
 */
export function calculateProductDistribution(
  feedback: Feedback[] = []
): DistributionItem[] {
  const counts: Record<string, number> = {
    "Chat Interface": 0,
    Dashboard: 0,
    "E-commerce": 0,
    null: 0,
  };

  for (const item of feedback) {
    const key = item.product ?? "null";
    if (key in counts) {
      counts[key] += 1;
    } else {
      counts["null"] += 1;
    }
  }

  return [
    {
      key: "Chat Interface",
      label: PRODUCT_META["Chat Interface"].label,
      count: counts["Chat Interface"],
      color: PRODUCT_META["Chat Interface"].color,
    },
    {
      key: "Dashboard",
      label: PRODUCT_META.Dashboard.label,
      count: counts.Dashboard,
      color: PRODUCT_META.Dashboard.color,
    },
    {
      key: "E-commerce",
      label: PRODUCT_META["E-commerce"].label,
      count: counts["E-commerce"],
      color: PRODUCT_META["E-commerce"].color,
    },
    {
      key: "null",
      label: PRODUCT_META.null.label,
      count: counts.null,
      color: PRODUCT_META.null.color,
    },
  ];
}

/**
 * Calculates feedback count grouped by sentiment.
 */
export function calculateSentimentDistribution(
  feedback: Feedback[] = []
): DistributionItem[] {
  const counts: Record<Sentiment, number> = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  for (const item of feedback) {
    if (item.sentiment in counts) {
      counts[item.sentiment] += 1;
    } else {
      counts.neutral += 1;
    }
  }

  return (Object.keys(SENTIMENT_META) as Sentiment[]).map((sent) => ({
    key: sent,
    label: SENTIMENT_META[sent].label,
    count: counts[sent],
    color: SENTIMENT_META[sent].color,
  }));
}

/**
 * Calculates feedback count grouped by severity.
 */
export function calculateSeverityDistribution(
  feedback: Feedback[] = []
): DistributionItem[] {
  const counts: Record<Severity, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  for (const item of feedback) {
    if (item.severity in counts) {
      counts[item.severity] += 1;
    } else {
      counts.low += 1;
    }
  }

  return (Object.keys(SEVERITY_META) as Severity[]).map((sev) => ({
    key: sev,
    label: SEVERITY_META[sev].label,
    count: counts[sev],
    color: SEVERITY_META[sev].color,
  }));
}

/**
 * Formats an ISO string (or YYYY-MM-DD) into a human readable display format like "Sep 01".
 */
function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

/**
 * Groups feedback by calendar date (YYYY-MM-DD) in chronological order (oldest to newest).
 */
export function calculateFeedbackTrend(
  feedback: Feedback[] = []
): TrendItem[] {
  if (feedback.length === 0) return [];

  const dateMap: Map<string, number> = new Map();

  for (const item of feedback) {
    if (!item.receivedAt) continue;
    try {
      const d = new Date(item.receivedAt);
      if (isNaN(d.getTime())) continue;
      const dateKey = d.toISOString().split("T")[0]; // YYYY-MM-DD
      dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
    } catch {
      // Ignore invalid dates
    }
  }

  // Sort chronologically ascending
  const sortedDates = Array.from(dateMap.keys()).sort((a, b) =>
    a.localeCompare(b)
  );

  return sortedDates.map((dateKey) => ({
    date: dateKey,
    displayDate: formatDisplayDate(dateKey),
    count: dateMap.get(dateKey) || 0,
  }));
}

/**
 * Calculates top issues grouped by frequency, sorted descending, excluding null or empty values.
 */
export function calculateTopIssues(
  feedback: Feedback[] = [],
  limit = 5
): IssueCount[] {
  const issueMap: Map<string, number> = new Map();

  for (const item of feedback) {
    if (typeof item.issue === "string" && item.issue.trim()) {
      const cleanIssue = item.issue.trim();
      issueMap.set(cleanIssue, (issueMap.get(cleanIssue) || 0) + 1);
    }
  }

  const issueList: IssueCount[] = Array.from(issueMap.entries()).map(
    ([issue, count]) => ({ issue, count })
  );

  // Sort descending by count, secondary sort alphabetical
  issueList.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.issue.localeCompare(b.issue);
  });

  return issueList.slice(0, limit);
}

/**
 * Returns the most recent feedback records sorted chronologically newest first.
 */
export function getRecentFeedback(
  feedback: Feedback[] = [],
  limit = 5
): Feedback[] {
  const validList = [...feedback].filter(
    (item) => item.receivedAt && !isNaN(new Date(item.receivedAt).getTime())
  );

  validList.sort((a, b) => {
    const timeA = new Date(a.receivedAt).getTime();
    const timeB = new Date(b.receivedAt).getTime();
    return timeB - timeA; // Newest first
  });

  return validList.slice(0, limit);
}
