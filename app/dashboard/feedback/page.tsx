import { DashboardMain } from "@/components/layout/dashboard-main";

interface FeedbackPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const { category } = await searchParams;

  return (
    <DashboardMain
      title="Feedback Management"
      description="View, filter, and triage customer feedback."
    >
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400 space-y-2">
        <p>This section will be implemented in a later phase.</p>
        {category && (
          <p className="text-xs font-mono text-slate-300">
            Current filter: <span className="text-blue-400 font-semibold">{category}</span>
          </p>
        )}
      </div>
    </DashboardMain>
  );
}
