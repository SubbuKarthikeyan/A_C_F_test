import React from "react";

export interface FeedbackMessageProps {
  body: string;
}

export function FeedbackMessage({ body }: FeedbackMessageProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Feedback Message
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap break-words bg-slate-950/50 rounded-lg p-4 border border-slate-800/80">
        {body || <span className="text-slate-500 italic">No message content provided.</span>}
      </div>
    </div>
  );
}
