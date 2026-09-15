interface DashboardMainProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardMain({ title, description, children }: DashboardMainProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white sm:text-2xl">{title}</h1>
        {description && (
          <p className="text-sm text-slate-400">{description}</p>
        )}
      </div>
      {children && <div className="space-y-6">{children}</div>}
    </div>
  );
}
