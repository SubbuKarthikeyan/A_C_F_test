"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { DistributionItem } from "@/lib/analytics";

export interface FeedbackByCategoryProps {
  data: DistributionItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DistributionItem;
    value: number;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
        <p className="text-xs font-semibold text-slate-200">{item.label}</p>
        <p className="mt-0.5 text-xs text-slate-400">
          Count:{" "}
          <span className="font-bold text-white">
            {item.count.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
}

export function FeedbackByCategory({ data }: FeedbackByCategoryProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
      role="region"
      aria-label="Feedback by Category Chart"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Feedback by Category
          </h3>
          <p className="text-xs text-slate-400">
            Breakdown across issue types
          </p>
        </div>
      </div>

      {total === 0 ? (
        <div className="flex h-64 items-center justify-center text-xs text-slate-500">
          No category data available.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <XAxis
                dataKey="label"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || "#818cf8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
