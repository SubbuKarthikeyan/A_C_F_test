import type { Feedback } from "@/types/feedback";

export interface FeedbackKpis {
  total: number;
  bugs: number;
  featureRequests: number;
  complaints: number;
  praise: number;
  questions: number;
  other: number;
}

/**
 * Dynamically calculates KPI metrics from a collection of feedback records.
 * Guarantees that: bugs + featureRequests + complaints + praise + questions + other === total
 */
export function calculateFeedbackKpis(feedback?: Feedback[] | null): FeedbackKpis {
  if (!feedback || !Array.isArray(feedback) || feedback.length === 0) {
    return {
      total: 0,
      bugs: 0,
      featureRequests: 0,
      complaints: 0,
      praise: 0,
      questions: 0,
      other: 0,
    };
  }

  let bugs = 0;
  let featureRequests = 0;
  let complaints = 0;
  let praise = 0;
  let questions = 0;
  let other = 0;

  for (const item of feedback) {
    switch (item.category) {
      case "bug":
        bugs += 1;
        break;
      case "feature_request":
        featureRequests += 1;
        break;
      case "complaint":
        complaints += 1;
        break;
      case "praise":
        praise += 1;
        break;
      case "question":
        questions += 1;
        break;
      case "other":
      default:
        other += 1;
        break;
    }
  }

  return {
    total: feedback.length,
    bugs,
    featureRequests,
    complaints,
    praise,
    questions,
    other,
  };
}
