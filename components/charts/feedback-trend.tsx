"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { TrendItem } from "@/lib/analytics";

export interface FeedbackTrendProps {
  data: TrendItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: TrendItem;
    value: number;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
        <p className="text-xs font-semibold text-slate-200">{item.date}</p>
        <p className="mt-0.5 text-xs text-slate-400">
          Feedback Count:{" "}
          <span className="font-bold text-white">
            {item.count.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
}

export function FeedbackTrend({ data }: FeedbackTrendProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
      role="region"
      aria-label="Feedback Trend Over Time Chart"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Feedback Trend Over Time
          </h3>
          <p className="text-xs text-slate-400">
            Daily submission volume in chronological order
          </p>
        </div>
      </div>

      {total === 0 || data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-xs text-slate-500">
          No trend data available.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: -20, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="displayDate"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#38bdf8", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#0284c7" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
