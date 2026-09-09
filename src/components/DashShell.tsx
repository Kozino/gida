"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Guard } from "@/components/Shell";
import { Building2, LogOut } from "lucide-react";

export function DashShell({
  brand,
  roles,
  items,
  children,
}: {
  brand: string;
  roles: string[];
  items: { href: string; label: string; icon?: React.ReactNode }[];
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { user, org, logout } = useAuth();
  const router = useRouter();
  return (
    <Guard roles={roles}>
      <div className="flex min-h-screen bg-[#eef6f3]">
        <aside className="hidden w-[260px] shrink-0 flex-col bg-teal-950 text-teal-50 md:flex">
          <Link href="/" className="flex items-center gap-2 px-5 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-teal-950">
              <Building2 size={18} />
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight">Gida</p>
              <p className="text-[11px] text-teal-200/80">{brand}</p>
            </div>
          </Link>
          <nav className="flex-1 space-y-0.5 px-3">
            {items.map((i) => {
              const on = path === i.href || (i.href !== items[0].href && path.startsWith(i.href));
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={`block rounded-xl px-3 py-2.5 text-sm ${
                    on ? "bg-white/10 font-semibold text-white" : "text-teal-100/80 hover:bg-white/5"
                  }`}
                >
                  {i.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-[11px] capitalize text-teal-200/80">{user?.role.replace("_", " ")}</p>
            {org && (
              <p className="mt-1 truncate text-[11px] text-amber-300">
                {org.name} · {org.verification}
              </p>
            )}
            <button
              className="mt-3 inline-flex items-center gap-1 text-xs text-teal-200 hover:text-white"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-teal-900/10 bg-white/80 px-4 py-3 backdrop-blur md:px-8">
            <p className="font-semibold text-teal-950 md:hidden">Gida · {brand}</p>
            <p className="hidden text-sm text-teal-800 md:block">
              {org ? `${org.city}, ${org.state}` : "Gida platform"}
            </p>
            <Link href="/browse" className="text-sm font-medium text-teal-800">
              Public site
            </Link>
          </header>
          <div className="flex-1 p-4 md:p-8">{children}</div>
        </div>
      </div>
    </Guard>
  );
}

export function PageTitle({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{kicker}</p>
        )}
        <h1 className="mt-1 font-display text-3xl text-teal-950 md:text-4xl">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function Pill({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "amber" | "rose" | "slate";
}) {
  const map = {
    teal: "bg-teal-100 text-teal-900",
    amber: "bg-amber-100 text-amber-900",
    rose: "bg-rose-100 text-rose-800",
    slate: "bg-slate-100 text-slate-700",
  };
  return <span className={`badge ${map[tone]}`}>{children}</span>;
}
