export type NavItem = {
  label: string;
  href: string;
  /** Optional: identifies this item as a category sub-link */
  category?: string;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const navigationGroups: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { label: "All Feedback", href: "/dashboard/feedback" },
      { label: "Bug Reports", href: "/dashboard/feedback?category=bug", category: "bug" },
      { label: "Feature Requests", href: "/dashboard/feedback?category=feature_request", category: "feature_request" },
      { label: "Complaints", href: "/dashboard/feedback?category=complaint", category: "complaint" },
      { label: "Praise", href: "/dashboard/feedback?category=praise", category: "praise" },
      { label: "Questions", href: "/dashboard/feedback?category=question", category: "question" },
      { label: "Other", href: "/dashboard/feedback?category=other", category: "other" },
    ],
  },
  {
    items: [
      { label: "Collect Feedback", href: "/dashboard/collect" },
    ],
  },
];
