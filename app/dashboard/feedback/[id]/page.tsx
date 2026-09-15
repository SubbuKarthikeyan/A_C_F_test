import { DashboardMain } from "@/components/layout/dashboard-main";
import { FeedbackDetailView } from "@/components/feedback/feedback-detail-view";

interface FeedbackDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedbackDetailPage({
  params,
}: FeedbackDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardMain
      title="Feedback Details"
      description="Inspect detailed customer feedback submission and classification metadata."
    >
      <FeedbackDetailView id={id} />
    </DashboardMain>
  );
}
