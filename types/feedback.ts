export type Product =
  | "Chat Interface"
  | "Dashboard"
  | "E-commerce";

export type Sentiment =
  | "positive"
  | "neutral"
  | "negative";

export type Category =
  | "bug"
  | "feature_request"
  | "complaint"
  | "praise"
  | "question"
  | "other";

export type Severity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface Feedback {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  product: Product | null;
  feature: string | null;
  issue: string | null;
  sentiment: Sentiment;
  category: Category;
  severity: Severity;
}
