import { DashboardMain } from "@/components/layout/dashboard-main";
import { FeedbackManagementView } from "@/components/feedback/feedback-management-view";

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
      description="View, search, filter, and triage customer feedback records."
    >
      <FeedbackManagementView
        key={category ?? "all"}
        initialCategory={category}
      />
    </DashboardMain>
  );
}
