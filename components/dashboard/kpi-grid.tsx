import React from "react";
import type { FeedbackKpis } from "@/lib/dashboard";
import { KpiCard } from "./kpi-card";

export interface KpiGridProps {
  kpis: FeedbackKpis;
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="space-y-4">
      {/* Primary Row: Total, Bugs, Feature Requests, Complaints */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Feedback"
          value={kpis.total}
          badge="All"
          badgeColor="text-blue-400 bg-blue-950/40 border-blue-800/60"
          icon={
            <svg
              className="h-4 w-4 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          }
        />

        <KpiCard
          title="Bugs"
          value={kpis.bugs}
          badge="Issues"
          badgeColor="text-rose-400 bg-rose-950/40 border-rose-800/60"
          icon={
            <svg
              className="h-4 w-4 text-rose-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />

        <KpiCard
          title="Feature Requests"
          value={kpis.featureRequests}
          badge="Features"
          badgeColor="text-amber-400 bg-amber-950/40 border-amber-800/60"
          icon={
            <svg
              className="h-4 w-4 text-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          }
        />

        <KpiCard
          title="Complaints"
          value={kpis.complaints}
          badge="Urgent"
          badgeColor="text-orange-400 bg-orange-950/40 border-orange-800/60"
          icon={
            <svg
              className="h-4 w-4 text-orange-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          }
        />
      </div>

      {/* Secondary Row: Praise, Questions, Other */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Praise"
          value={kpis.praise}
          badge="Positive"
          badgeColor="text-emerald-400 bg-emerald-950/40 border-emerald-800/60"
          icon={
            <svg
              className="h-4 w-4 text-emerald-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          }
        />

        <KpiCard
          title="Questions"
          value={kpis.questions}
          badge="Inquiries"
          badgeColor="text-cyan-400 bg-cyan-950/40 border-cyan-800/60"
          icon={
            <svg
              className="h-4 w-4 text-cyan-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <KpiCard
          title="Other"
          value={kpis.other}
          badge="General"
          badgeColor="text-slate-400 bg-slate-800/60 border-slate-700/60"
          icon={
            <svg
              className="h-4 w-4 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}
