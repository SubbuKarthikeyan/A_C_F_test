import React from "react";

export interface KpiCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export function KpiCard({
  title,
  value,
  icon,
  badge,
  badgeColor = "text-slate-400 bg-slate-800/80 border-slate-700/60",
}: KpiCardProps) {
  const formattedValue = Number.isFinite(value)
    ? value.toLocaleString()
    : "0";

  return (
    <div
      className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90"
      role="region"
      aria-label={`${title} KPI`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/60 text-slate-400">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {formattedValue}
        </span>
        {badge && (
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${badgeColor}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
