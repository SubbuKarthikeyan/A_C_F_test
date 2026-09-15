import type {
  Category,
  Feedback,
  Product,
  Sentiment,
  Severity,
} from "@/types/feedback";

export interface FeedbackFilters {
  search: string;
  category: Category | "all";
  product: Product | "all" | "not_specified";
  sentiment: Sentiment | "all";
  severity: Severity | "all";
  fromDate: string; // YYYY-MM-DD
  toDate: string; // YYYY-MM-DD
}

export const DEFAULT_FEEDBACK_FILTERS: FeedbackFilters = {
  search: "",
  category: "all",
  product: "all",
  sentiment: "all",
  severity: "all",
  fromDate: "",
  toDate: "",
};

/**
 * Checks if a given item matches all active filter criteria.
 */
function matchesFilters(item: Feedback, filters: FeedbackFilters): boolean {
  // 1. Search Query (Case-insensitive substring match across multiple fields)
  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    const searchableContent = [
      item.name,
      item.email,
      item.subject,
      item.body,
      item.product ?? "",
      item.feature ?? "",
      item.issue ?? "",
    ]
      .join(" ")
      .toLowerCase();

    if (!searchableContent.includes(query)) {
      return false;
    }
  }

  // 2. Category Filter
  if (filters.category !== "all" && item.category !== filters.category) {
    return false;
  }

  // 3. Product Filter
  if (filters.product === "not_specified") {
    if (item.product !== null && item.product !== undefined) {
      return false;
    }
  } else if (filters.product !== "all") {
    if (item.product !== filters.product) {
      return false;
    }
  }

  // 4. Sentiment Filter
  if (filters.sentiment !== "all" && item.sentiment !== filters.sentiment) {
    return false;
  }

  // 5. Severity Filter
  if (filters.severity !== "all" && item.severity !== filters.severity) {
    return false;
  }

  // 6. Date Range Filter (YYYY-MM-DD comparison)
  if (filters.fromDate || filters.toDate) {
    let itemDate = "";
    try {
      const d = new Date(item.receivedAt);
      if (!isNaN(d.getTime())) {
        itemDate = d.toISOString().split("T")[0];
      } else {
        itemDate = item.receivedAt.split("T")[0] || "";
      }
    } catch {
      itemDate = item.receivedAt.split("T")[0] || "";
    }

    if (filters.fromDate && itemDate && itemDate < filters.fromDate) {
      return false;
    }

    if (filters.toDate && itemDate && itemDate > filters.toDate) {
      return false;
    }
  }

  return true;
}

/**
 * Pure function that filters and sorts feedback items without mutating the original array.
 * Items are always sorted in descending chronological order (newest first).
 */
export function filterFeedback(
  feedback: Feedback[] = [],
  filters: FeedbackFilters
): Feedback[] {
  const filtered = feedback.filter((item) => matchesFilters(item, filters));

  return filtered.sort((a, b) => {
    const timeA = new Date(a.receivedAt).getTime();
    const timeB = new Date(b.receivedAt).getTime();
    return timeB - timeA;
  });
}
