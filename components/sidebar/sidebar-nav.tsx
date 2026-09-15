"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { navigationGroups, type NavItem } from "./navigation-config";

interface SidebarNavProps {
  onNavigate?: () => void;
}

function isItemActive(item: NavItem, pathname: string, searchParams: URLSearchParams): boolean {
  if (item.category) {
    return (
      pathname === "/dashboard/feedback" &&
      searchParams.get("category") === item.category
    );
  }
  if (item.href === "/dashboard/feedback") {
    return pathname === "/dashboard/feedback" && !searchParams.get("category");
  }
  return pathname === item.href;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav aria-label="Main navigation">
      <ul className="space-y-1" role="list">
        {navigationGroups.map((group, groupIdx) => (
          <li key={groupIdx}>
            {group.label && (
              <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 select-none">
                {group.label}
              </p>
            )}
            <ul role="list" className="space-y-0.5">
              {group.items.map((item) => {
                const active = isItemActive(item, pathname, searchParams);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "flex items-center rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                        item.category ? "pl-6" : "",
                        active
                          ? "bg-slate-700 font-semibold text-white"
                          : "font-normal text-slate-400 hover:bg-slate-800 hover:text-white",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
