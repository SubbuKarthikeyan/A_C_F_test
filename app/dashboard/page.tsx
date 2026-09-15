import { DashboardMain } from "@/components/layout/dashboard-main";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return (
    <DashboardMain
      title="Dashboard"
      description="Overview of customer feedback metrics and insights."
    >
      <DashboardView />
    </DashboardMain>
  );
}

