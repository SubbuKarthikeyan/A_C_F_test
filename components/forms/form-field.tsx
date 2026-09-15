import React from "react";

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required = false,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-medium text-slate-300"
        >
          {label}{" "}
          {required ? (
            <span className="text-rose-400 font-bold" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="text-[11px] font-normal text-slate-500">
              (optional)
            </span>
          )}
        </label>
      </div>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-rose-400 font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}
