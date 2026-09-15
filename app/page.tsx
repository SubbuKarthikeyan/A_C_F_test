import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-xl text-center space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Customer Feedback Intelligence
          </h1>
          <p className="text-base text-slate-400 sm:text-lg">
            A manager-focused application for collecting and understanding
            customer feedback.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 shadow-sm transition hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
