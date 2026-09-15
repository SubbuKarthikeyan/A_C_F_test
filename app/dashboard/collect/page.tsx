import { DashboardMain } from "@/components/layout/dashboard-main";
import { FeedbackForm } from "@/components/forms/feedback-form";

export default function CollectPage() {
  return (
    <DashboardMain
      title="Collect Feedback"
      description="Submit and classify new customer feedback submissions."
    >
      <div className="max-w-4xl">
        <FeedbackForm />
      </div>
    </DashboardMain>
  );
}
