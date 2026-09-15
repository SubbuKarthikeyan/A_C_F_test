import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-white">
            Customer Feedback Intelligence
          </span>
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Dashboard
          </Link>
        </div>
        <UserButton />
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
