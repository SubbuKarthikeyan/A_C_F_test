"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DistributionItem } from "@/lib/analytics";

export interface SentimentDistributionProps {
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

export function SentimentDistribution({ data }: SentimentDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
      role="region"
      aria-label="Sentiment Distribution Chart"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Sentiment Distribution
          </h3>
          <p className="text-xs text-slate-400">
            Customer mood and sentiment breakdown
          </p>
        </div>
      </div>

      {total === 0 ? (
        <div className="flex h-64 items-center justify-center text-xs text-slate-500">
          No sentiment data available.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="count"
                nameKey="label"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`sentiment-cell-${index}`}
                    fill={entry.color || "#10b981"}
                    stroke="#0f172a"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => {
                  const item = data.find((d) => d.label === value);
                  const percentage =
                    total > 0 && item
                      ? ` (${Math.round((item.count / total) * 100)}%)`
                      : "";
                  return (
                    <span className="text-xs font-medium text-slate-300">
                      {value}
                      <span className="text-slate-500">{percentage}</span>
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
