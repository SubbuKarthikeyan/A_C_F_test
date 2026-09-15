"use client";

import React from "react";
import type { FeedbackFilters as FeedbackFiltersType } from "@/lib/feedback-filters";
import type { Category, Product, Sentiment, Severity } from "@/types/feedback";

export interface FeedbackFiltersProps {
  filters: FeedbackFiltersType;
  onFilterChange: <K extends keyof FeedbackFiltersType>(
    key: K,
    value: FeedbackFiltersType[K]
  ) => void;
  onReset: () => void;
  isFiltered: boolean;
}

export function FeedbackFilters({
  filters,
  onFilterChange,
  onReset,
  isFiltered,
}: FeedbackFiltersProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm sm:p-5">
      <div className="space-y-4">
        {/* Top Row: Search and Reset Action */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <label htmlFor="feedback-search" className="sr-only">
              Search feedback
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              id="feedback-search"
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              placeholder="Search feedback by customer, subject, content, feature..."
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2 pl-9 pr-8 text-xs text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange("search", "")}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-200"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onReset}
              disabled={!isFiltered}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                isFiltered
                  ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  : "cursor-not-allowed border-slate-800/60 bg-slate-900/40 text-slate-500"
              }`}
            >
              <svg
                className="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {/* Category Select */}
          <div>
            <label
              htmlFor="filter-category"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filters.category}
              onChange={(e) =>
                onFilterChange("category", e.target.value as Category | "all")
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
              <option value="complaint">Complaint</option>
              <option value="praise">Praise</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Product Select */}
          <div>
            <label
              htmlFor="filter-product"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              Product
            </label>
            <select
              id="filter-product"
              value={filters.product}
              onChange={(e) =>
                onFilterChange(
                  "product",
                  e.target.value as Product | "all" | "not_specified"
                )
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Products</option>
              <option value="Chat Interface">Chat Interface</option>
              <option value="Dashboard">Dashboard</option>
              <option value="E-commerce">E-commerce</option>
              <option value="not_specified">Not Specified</option>
            </select>
          </div>

          {/* Sentiment Select */}
          <div>
            <label
              htmlFor="filter-sentiment"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              Sentiment
            </label>
            <select
              id="filter-sentiment"
              value={filters.sentiment}
              onChange={(e) =>
                onFilterChange("sentiment", e.target.value as Sentiment | "all")
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          {/* Severity Select */}
          <div>
            <label
              htmlFor="filter-severity"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              Severity
            </label>
            <select
              id="filter-severity"
              value={filters.severity}
              onChange={(e) =>
                onFilterChange("severity", e.target.value as Severity | "all")
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label
              htmlFor="filter-from-date"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              From Date
            </label>
            <input
              id="filter-from-date"
              type="date"
              value={filters.fromDate}
              onChange={(e) => onFilterChange("fromDate", e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 [color-scheme:dark]"
            />
          </div>

          {/* To Date */}
          <div>
            <label
              htmlFor="filter-to-date"
              className="mb-1 block text-[11px] font-medium text-slate-400"
            >
              To Date
            </label>
            <input
              id="filter-to-date"
              type="date"
              value={filters.toDate}
              onChange={(e) => onFilterChange("toDate", e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 [color-scheme:dark]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
