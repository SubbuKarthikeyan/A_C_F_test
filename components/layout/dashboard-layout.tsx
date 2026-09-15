"use client";

import { useState } from "react";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "../sidebar/dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleMobile() {
    setMobileOpen((prev) => !prev);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-950">
      <DashboardHeader onMenuClick={toggleMobile} isMobileOpen={mobileOpen} />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isMobileOpen={mobileOpen} onNavigate={closeMobile} />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
