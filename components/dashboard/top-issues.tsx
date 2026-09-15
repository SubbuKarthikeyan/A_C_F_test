"use client";

import React from "react";
import type { IssueCount } from "@/lib/analytics";

export interface TopIssuesProps {
  issues: IssueCount[];
}

export function TopIssues({ issues }: TopIssuesProps) {
  return (
    <div
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
      role="region"
      aria-label="Top Issues List"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Top Reported Issues</h3>
        <p className="text-xs text-slate-400">
          Most frequent specific customer pain points
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-xs text-slate-500">
          No issues available.
        </div>
      ) : (
        <div className="divide-y divide-slate-800/80">
          {issues.map((item, index) => (
            <div
              key={`issue-${index}`}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 pr-4">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-slate-400">
                  {index + 1}
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {item.issue}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-md border border-rose-900/40 bg-rose-950/30 px-2 py-0.5 text-xs font-semibold text-rose-400">
                {item.count} {item.count === 1 ? "report" : "reports"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
