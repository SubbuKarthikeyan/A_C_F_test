"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addFeedback } from "@/lib/feedback";
import {
  INITIAL_FEEDBACK_FORM_VALUES,
  validateFeedbackForm,
  transformFormToFeedbackInput,
  type FeedbackFormValues,
  type FeedbackFormErrors,
} from "@/lib/feedback-validation";
import type { Category, Product, Sentiment, Severity } from "@/types/feedback";
import { FormField } from "./form-field";

export function FeedbackForm() {
  const router = useRouter();
  const [values, setValues] = useState<FeedbackFormValues>(
    INITIAL_FEEDBACK_FORM_VALUES
  );
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleChange = <K extends keyof FeedbackFormValues>(
    key: K,
    val: FeedbackFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    // Clear field-specific error on change if present
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleReset = () => {
    setValues(INITIAL_FEEDBACK_FORM_VALUES);
    setErrors({});
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setGlobalError(null);

    // 1. Client-side Validation
    const validation = validateFeedbackForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // 2. Submission
    setIsSubmitting(true);
    try {
      const feedbackInput = transformFormToFeedbackInput(values);
      addFeedback(feedbackInput);
      setSubmitSuccess(true);

      // 3. Navigate to feedback management page
      setTimeout(() => {
        router.push("/dashboard/feedback");
      }, 500);
    } catch (err) {
      console.error("Feedback submission failed:", err);
      setGlobalError("Unable to submit feedback. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-label="Feedback collection form"
    >
      {/* Success Notification Banner */}
      {submitSuccess && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-emerald-800/80 bg-emerald-950/40 p-4 text-xs sm:text-sm text-emerald-200"
        >
          <svg
            className="h-5 w-5 text-emerald-400 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold">Feedback submitted successfully!</p>
            <p className="text-[11px] text-emerald-400/90 mt-0.5">
              Redirecting to feedback management...
            </p>
          </div>
        </div>
      )}

      {/* Global Error Banner */}
      {globalError && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-rose-800/80 bg-rose-950/40 p-4 text-xs sm:text-sm text-rose-200"
        >
          <svg
            className="h-5 w-5 text-rose-400 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-medium">{globalError}</p>
        </div>
      )}

      {/* Section 1: Customer Contact Information */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Customer Information
          </h2>
          <p className="text-xs text-slate-400">
            Identify the individual submitting this feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="feedback-name"
            label="Customer Name"
            required
            error={errors.name}
          >
            <input
              id="feedback-name"
              type="text"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Alex Johnson"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "feedback-name-error" : undefined}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </FormField>

          <FormField
            id="feedback-email"
            label="Email Address"
            required
            error={errors.email}
          >
            <input
              id="feedback-email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="e.g., alex@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "feedback-email-error" : undefined}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </FormField>
        </div>
      </div>

      {/* Section 2: Feedback & Product Context */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Feedback & Context
          </h2>
          <p className="text-xs text-slate-400">
            Provide the subject summary and optional product scope.
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            id="feedback-subject"
            label="Subject"
            required
            error={errors.subject}
          >
            <input
              id="feedback-subject"
              type="text"
              value={values.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Brief summary of the feedback (e.g., Chat widget freezing on Safari)"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={
                errors.subject ? "feedback-subject-error" : undefined
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField id="feedback-product" label="Product">
              <select
                id="feedback-product"
                value={values.product}
                onChange={(e) =>
                  handleChange(
                    "product",
                    e.target.value as Product | "not_specified"
                  )
                }
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="not_specified">Not Specified</option>
                <option value="Chat Interface">Chat Interface</option>
                <option value="Dashboard">Dashboard</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </FormField>

            <FormField id="feedback-feature" label="Feature Area">
              <input
                id="feedback-feature"
                type="text"
                value={values.feature}
                onChange={(e) => handleChange("feature", e.target.value)}
                placeholder="e.g., Checkout Flow"
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </FormField>

            <FormField id="feedback-issue" label="Reported Issue">
              <input
                id="feedback-issue"
                type="text"
                value={values.issue}
                onChange={(e) => handleChange("issue", e.target.value)}
                placeholder="e.g., Payment gateway timeout"
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 3: Classification & Severity */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Classification & Triage
          </h2>
          <p className="text-xs text-slate-400">
            Categorize and set initial priority ratings for this feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            id="feedback-category"
            label="Category"
            required
            error={errors.category}
          >
            <select
              id="feedback-category"
              value={values.category}
              onChange={(e) =>
                handleChange("category", e.target.value as Category | "")
              }
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? "feedback-category-error" : undefined
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a category...</option>
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
              <option value="complaint">Complaint</option>
              <option value="praise">Praise</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </FormField>

          <FormField
            id="feedback-sentiment"
            label="Sentiment"
            required
            error={errors.sentiment}
          >
            <select
              id="feedback-sentiment"
              value={values.sentiment}
              onChange={(e) =>
                handleChange("sentiment", e.target.value as Sentiment | "")
              }
              aria-invalid={Boolean(errors.sentiment)}
              aria-describedby={
                errors.sentiment ? "feedback-sentiment-error" : undefined
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select sentiment...</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </FormField>

          <FormField
            id="feedback-severity"
            label="Severity"
            required
            error={errors.severity}
          >
            <select
              id="feedback-severity"
              value={values.severity}
              onChange={(e) =>
                handleChange("severity", e.target.value as Severity | "")
              }
              aria-invalid={Boolean(errors.severity)}
              aria-describedby={
                errors.severity ? "feedback-severity-error" : undefined
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select severity...</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </FormField>
        </div>
      </div>

      {/* Section 4: Detailed Message Body */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Feedback Description
          </h2>
          <p className="text-xs text-slate-400">
            Enter the complete feedback message provided by the customer.
          </p>
        </div>

        <FormField
          id="feedback-body"
          label="Detailed Description"
          required
          error={errors.body}
        >
          <textarea
            id="feedback-body"
            rows={5}
            value={values.body}
            onChange={(e) => handleChange("body", e.target.value)}
            placeholder="Type or paste the complete feedback content here..."
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? "feedback-body-error" : undefined}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm resize-y"
          />
        </FormField>
      </div>

      {/* Form Submission Controls */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Feedback</span>
          )}
        </button>
      </div>
    </form>
  );
}
