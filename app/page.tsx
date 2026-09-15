import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-xl text-center space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20">
            Phase 1 Foundation
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Customer Feedback Intelligence
          </h1>
          <p className="text-base text-slate-400 sm:text-lg">
            A manager-focused application for collecting and understanding customer feedback.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in to continue
          </Link>
        </div>
      </div>
    </main>
  );
}
