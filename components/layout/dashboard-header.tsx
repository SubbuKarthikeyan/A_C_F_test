"use client";

import { UserButton } from "@clerk/nextjs";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  isMobileOpen: boolean;
}

export function DashboardHeader({ onMenuClick, isMobileOpen }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 sm:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileOpen}
          aria-controls="dashboard-sidebar"
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 md:hidden"
        >
          {isMobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* App name — desktop only */}
        <span className="hidden text-sm font-semibold text-white md:block">
          Customer Feedback Intelligence
        </span>
      </div>

      {/* Clerk user button */}
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
}
