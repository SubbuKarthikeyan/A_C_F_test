"use client";

import { Suspense } from "react";
import { SidebarNav } from "./sidebar-nav";

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  onNavigate: () => void;
}

export function DashboardSidebar({ isMobileOpen, onNavigate }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          aria-hidden="true"
          onClick={onNavigate}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="dashboard-sidebar"
        aria-label="Sidebar navigation"
        className={[
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-slate-900 border-r border-slate-800",
          "md:static md:z-auto md:flex",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "transition-transform duration-200 ease-in-out",
        ].join(" ")}
      >
        {/* App name */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-800 px-4">
          <span className="text-sm font-bold leading-tight text-white">
            Customer Feedback
            <br />
            Intelligence
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <Suspense fallback={<div className="text-sm text-slate-500 px-3">Loading nav…</div>}>
            <SidebarNav onNavigate={onNavigate} />
          </Suspense>
        </div>
      </aside>
    </>
  );
}
