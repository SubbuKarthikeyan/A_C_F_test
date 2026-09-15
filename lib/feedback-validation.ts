import type {
  Category,
  Product,
  Sentiment,
  Severity,
} from "@/types/feedback";
import type { NewFeedbackInput } from "@/lib/feedback";

export interface FeedbackFormValues {
  name: string;
  email: string;
  subject: string;
  product: Product | "not_specified" | "";
  feature: string;
  issue: string;
  category: Category | "";
  sentiment: Sentiment | "";
  severity: Severity | "";
  body: string;
}

export type FeedbackFormErrors = Partial<Record<keyof FeedbackFormValues, string>>;

export const INITIAL_FEEDBACK_FORM_VALUES: FeedbackFormValues = {
  name: "",
  email: "",
  subject: "",
  product: "not_specified",
  feature: "",
  issue: "",
  category: "",
  sentiment: "",
  severity: "",
  body: "",
};

const VALID_CATEGORIES: ReadonlySet<string> = new Set([
  "bug",
  "feature_request",
  "complaint",
  "praise",
  "question",
  "other",
]);

const VALID_SENTIMENTS: ReadonlySet<string> = new Set([
  "positive",
  "neutral",
  "negative",
]);

const VALID_SEVERITIES: ReadonlySet<string> = new Set([
  "low",
  "medium",
  "high",
  "critical",
]);

const VALID_PRODUCTS: ReadonlySet<string> = new Set([
  "Chat Interface",
  "Dashboard",
  "E-commerce",
]);

/**
 * Basic email syntax validation (e.g. user@example.com).
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Pure validation function for feedback collection form.
 */
export function validateFeedbackForm(values: FeedbackFormValues): {
  isValid: boolean;
  errors: FeedbackFormErrors;
} {
  const errors: FeedbackFormErrors = {};

  // 1. Name: Required
  if (!values.name.trim()) {
    errors.name = "Customer name is required.";
  }

  // 2. Email: Required & Valid format
  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address (e.g., user@example.com).";
  }

  // 3. Subject: Required
  if (!values.subject.trim()) {
    errors.subject = "Subject line is required.";
  }

  // 4. Category: Required & must be valid
  if (!values.category) {
    errors.category = "Please select a feedback category.";
  } else if (!VALID_CATEGORIES.has(values.category)) {
    errors.category = "Invalid category selected.";
  }

  // 5. Sentiment: Required & must be valid
  if (!values.sentiment) {
    errors.sentiment = "Please select a sentiment.";
  } else if (!VALID_SENTIMENTS.has(values.sentiment)) {
    errors.sentiment = "Invalid sentiment selected.";
  }

  // 6. Severity: Required & must be valid
  if (!values.severity) {
    errors.severity = "Please select a severity level.";
  } else if (!VALID_SEVERITIES.has(values.severity)) {
    errors.severity = "Invalid severity selected.";
  }

  // 7. Body/Description: Required
  if (!values.body.trim()) {
    errors.body = "Feedback description is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Transforms form values into a clean NewFeedbackInput object ready for addFeedback().
 * Maps empty or unselected optional fields to null.
 */
export function transformFormToFeedbackInput(
  values: FeedbackFormValues
): NewFeedbackInput {
  let productValue: Product | null = null;
  if (
    values.product &&
    values.product !== "not_specified" &&
    VALID_PRODUCTS.has(values.product)
  ) {
    productValue = values.product as Product;
  }

  const featureValue = values.feature.trim() ? values.feature.trim() : null;
  const issueValue = values.issue.trim() ? values.issue.trim() : null;

  return {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    body: values.body.trim(),
    product: productValue,
    feature: featureValue,
    issue: issueValue,
    category: values.category as Category,
    sentiment: values.sentiment as Sentiment,
    severity: values.severity as Severity,
  };
}
