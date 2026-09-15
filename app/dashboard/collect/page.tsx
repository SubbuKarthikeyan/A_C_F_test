import { DashboardMain } from "@/components/layout/dashboard-main";

export default function CollectPage() {
  return (
    <DashboardMain
      title="Collect Feedback"
      description="Submit and ingest new feedback items."
    >
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        The feedback submission and ingestion form will be implemented in a later phase.
      </div>
    </DashboardMain>
  );
}
