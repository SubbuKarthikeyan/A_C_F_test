import { mockFeedback } from "@/data/mock-feedback";
import type {
  Category,
  Feedback,
  Product,
  Sentiment,
  Severity,
} from "@/types/feedback";

export const FEEDBACK_STORAGE_KEY = "customer-feedback-intelligence-feedback";

const VALID_PRODUCTS: ReadonlySet<Product> = new Set([
  "Chat Interface",
  "Dashboard",
  "E-commerce",
]);

const VALID_CATEGORIES: ReadonlySet<Category> = new Set([
  "bug",
  "feature_request",
  "complaint",
  "praise",
  "question",
  "other",
]);

const VALID_SENTIMENTS: ReadonlySet<Sentiment> = new Set([
  "positive",
  "neutral",
  "negative",
]);

const VALID_SEVERITIES: ReadonlySet<Severity> = new Set([
  "low",
  "medium",
  "high",
  "critical",
]);

/**
 * Validates whether an unknown item conforms to the strict Feedback interface.
 */
function isValidFeedback(item: unknown): item is Feedback {
  if (!item || typeof item !== "object") return false;

  const f = item as Record<string, unknown>;

  if (typeof f.id !== "string" || !f.id.trim()) return false;
  if (typeof f.receivedAt !== "string" || !f.receivedAt.trim()) return false;
  if (typeof f.name !== "string") return false;
  if (typeof f.email !== "string") return false;
  if (typeof f.subject !== "string") return false;
  if (typeof f.body !== "string") return false;

  if (f.product !== null && !VALID_PRODUCTS.has(f.product as Product)) {
    return false;
  }

  if (f.feature !== null && typeof f.feature !== "string") return false;
  if (f.issue !== null && typeof f.issue !== "string") return false;

  if (!VALID_CATEGORIES.has(f.category as Category)) return false;
  if (!VALID_SENTIMENTS.has(f.sentiment as Sentiment)) return false;
  if (!VALID_SEVERITIES.has(f.severity as Severity)) return false;

  return true;
}

/**
 * Generates a browser-safe unique feedback identifier.
 */
function generateFeedbackId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `feedback-${crypto.randomUUID()}`;
  }
  return `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Checks if the browser window and localStorage are accessible.
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__test_storage_availability__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads feedback from local storage.
 * - If key does not exist: seeds with mock feedback and persists.
 * - If stored data is empty array []: returns [] as valid data.
 * - If stored data is corrupted or invalid: recovers safely with mock feedback.
 */
export function getFeedback(): Feedback[] {
  if (!isLocalStorageAvailable()) {
    return [...mockFeedback];
  }

  try {
    const rawData = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);

    // Initial load: no record exists in localStorage yet
    if (rawData === null) {
      window.localStorage.setItem(
        FEEDBACK_STORAGE_KEY,
        JSON.stringify(mockFeedback)
      );
      return [...mockFeedback];
    }

    const parsed: unknown = JSON.parse(rawData);

    // If storage contains a valid empty array, treat as valid data
    if (Array.isArray(parsed) && parsed.length === 0) {
      return [];
    }

    // Validate array of items
    if (Array.isArray(parsed)) {
      const validItems = parsed.filter(isValidFeedback);
      if (validItems.length > 0 || parsed.length === 0) {
        return validItems;
      }
    }

    // If parsing produced non-array or completely invalid corrupted items, safely recover
    window.localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify(mockFeedback)
    );
    return [...mockFeedback];
  } catch {
    // Handle corrupted JSON or storage errors gracefully
    try {
      window.localStorage.setItem(
        FEEDBACK_STORAGE_KEY,
        JSON.stringify(mockFeedback)
      );
    } catch {
      // Ignore storage write failure
    }
    return [...mockFeedback];
  }
}

/**
 * Retrieves a single feedback record by its unique identifier.
 */
export function getFeedbackById(id: string): Feedback | undefined {
  if (!id) return undefined;
  const feedbackList = getFeedback();
  return feedbackList.find((item) => item.id === id);
}

/**
 * Persists the given feedback collection to localStorage.
 */
function persistFeedback(feedbackList: Feedback[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify(feedbackList)
    );
    window.dispatchEvent(new Event("feedback-updated"));
  } catch (error) {
    console.error("Failed to persist feedback to localStorage:", error);
  }
}

export type NewFeedbackInput = Omit<Feedback, "id" | "receivedAt"> & {
  id?: string;
  receivedAt?: string;
};

/**
 * Adds a new feedback record, assigns a unique ID and ISO timestamp if not provided,
 * persists the updated collection, and returns the entire updated list.
 */
export function addFeedback(feedback: NewFeedbackInput | Feedback): Feedback[] {
  const newRecord: Feedback = {
    id: feedback.id && feedback.id.trim() ? feedback.id : generateFeedbackId(),
    receivedAt:
      feedback.receivedAt && feedback.receivedAt.trim()
        ? feedback.receivedAt
        : new Date().toISOString(),
    name: feedback.name ?? "",
    email: feedback.email ?? "",
    subject: feedback.subject ?? "",
    body: feedback.body ?? "",
    product: feedback.product ?? null,
    feature: feedback.feature ?? null,
    issue: feedback.issue ?? null,
    sentiment: feedback.sentiment ?? "neutral",
    category: feedback.category ?? "other",
    severity: feedback.severity ?? "low",
  };

  if (!isValidFeedback(newRecord)) {
    console.warn("Attempted to add invalid feedback record:", newRecord);
    return getFeedback();
  }

  const currentList = getFeedback();
  const updatedList = [newRecord, ...currentList];
  persistFeedback(updatedList);
  return updatedList;
}

/**
 * Updates an existing feedback record matching on ID.
 * If the record is found and valid, persists and returns the updated list.
 */
export function updateFeedback(updatedRecord: Feedback): Feedback[] {
  if (!isValidFeedback(updatedRecord)) {
    console.warn("Attempted to update with invalid feedback record:", updatedRecord);
    return getFeedback();
  }

  const currentList = getFeedback();
  const index = currentList.findIndex((item) => item.id === updatedRecord.id);

  if (index === -1) {
    return currentList;
  }

  const updatedList = [...currentList];
  updatedList[index] = { ...updatedRecord };
  persistFeedback(updatedList);
  return updatedList;
}

/**
 * Removes a feedback record by its unique ID, persists the remaining collection,
 * and returns the updated list.
 */
export function deleteFeedback(id: string): Feedback[] {
  if (!id) return getFeedback();

  const currentList = getFeedback();
  const updatedList = currentList.filter((item) => item.id !== id);

  persistFeedback(updatedList);
  return updatedList;
}

/**
 * Resets local storage back to the initial mock feedback dataset.
 */
export function resetFeedback(): Feedback[] {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(
        FEEDBACK_STORAGE_KEY,
        JSON.stringify(mockFeedback)
      );
    } catch {
      // Ignore
    }
  }
  return [...mockFeedback];
}
