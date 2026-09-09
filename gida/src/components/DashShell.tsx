"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Guard } from "@/components/Shell";
import { Building2, LogOut, Menu, X, type LucideIcon } from "lucide-react";

/* ---------- Sidebar shell ---------- */

export type NavItem = {
  href: string;
  label: string;
  icon?: LucideIcon;
};

export function DashShell({
  brand,
  roles,
  items,
  children,
}: {
  brand: string;
  roles: string[];
  items: NavItem[];
  children: ReactNode;
}) {
  const path = usePathname();
  const { user, org, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const home = items[0]?.href;
  const isActive = (href: string) => (href === home ? path === href : path === href || path.startsWith(href + "/"));

  const roleLabel: Record<string, string> = {
    platform_admin: "Platform admin",
    owner: "Owner",
    manager: "Manager",
    accountant: "Accountant",
    caretaker: "Caretaker",
    security: "Security",
    tenant: "Tenant",
    sponsor: "Sponsor",
  };

  function signOut() {
    logout();
    router.push("/");
  }

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 space-y-0.5 px-3">
      {items.map((i) => {
        const on = isActive(i.href);
        const Icon = i.icon;
        return (
          <Link
            key={i.href}
            href={i.href}
            onClick={onNavigate}
            className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
              on ? "bg-white/10 font-semibold text-white" : "text-teal-100/80 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className={`absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full ${on ? "bg-amber-400" : "bg-transparent"}`} />
            {Icon && <Icon size={16} className={on ? "text-amber-300" : "text-teal-200/60"} />}
            {i.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <Guard roles={roles}>
      <div className="flex min-h-screen bg-[#eef6f3]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col bg-teal-950 text-teal-50 md:flex">
          <Link href="/" className="flex items-center gap-2 px-5 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-teal-950">
              <Building2 size={18} />
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight">Gida</p>
              <p className="text-[11px] text-teal-200/80">{brand}</p>
            </div>
          </Link>
          <div className="flex-1 overflow-y-auto py-1">
            <Nav />
          </div>
          <div className="border-t border-white/10 p-4">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="text-[11px] text-teal-200/80">{roleLabel[user?.role || ""] || user?.role}</p>
            {org && (
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                <p className="truncate text-[11px] text-teal-200/90">{org.name}</p>
                <Pill tone={org.verification === "verified" ? "emerald" : "amber"}>{org.verification}</Pill>
              </div>
            )}
            <button
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-teal-200 transition hover:text-white"
              onClick={signOut}
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-teal-950 text-teal-50 shadow-2xl">
              <div className="flex items-center justify-between px-5 py-5">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-teal-950">
                    <Building2 size={16} />
                  </span>
                  Gida · {brand}
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-teal-200">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-1">
                <Nav onNavigate={() => setOpen(false)} />
              </div>
              <div className="border-t border-white/10 p-4">
                <p className="truncate text-sm font-semibold">{user?.name}</p>
                <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-teal-200" onClick={signOut}>
                  <LogOut size={12} /> Sign out
                </button>
              </div>
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-teal-900/10 bg-white/80 px-4 py-3 backdrop-blur md:px-8">
            <button
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-teal-900/10 text-teal-900 md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
            <p className="font-semibold text-teal-950 md:hidden">Gida · {brand}</p>
            <p className="hidden text-sm text-teal-800 md:block">
              {org ? `${org.city}, ${org.state}` : "Gida platform"}
            </p>
            <Link href="/browse" className="text-sm font-medium text-teal-800">
              Public site
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </Guard>
  );
}

/* ---------- Page primitives ---------- */

export function PageTitle({
  kicker,
  title,
  subtitle,
  action,
}: {
  kicker?: string;
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{kicker}</p>}
        <h1 className="mt-1 font-display text-3xl text-teal-950 md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-teal-800/80">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

const pillTones = {
  teal: "bg-teal-100 text-teal-900",
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-900",
  rose: "bg-rose-100 text-rose-800",
  slate: "bg-slate-100 text-slate-700",
  sky: "bg-sky-100 text-sky-800",
};

export function Pill({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: keyof typeof pillTones;
}) {
  return <span className={`badge capitalize ${pillTones[tone]}`}>{children}</span>;
}

export function statusTone(status: string): keyof typeof pillTones {
  const s = status.toLowerCase();
  if (["verified", "active", "approved", "confirmed", "resolved", "closed", "live", "published", "used"].includes(s))
    return "emerald";
  if (["rejected", "suspended", "overdue", "expired"].includes(s)) return "rose";
  if (
    ["submitted", "needs_info", "pending", "in_progress", "draft", "open", "review", "caretaker_review", "token_issued", "payment_uploaded", "documents", "signed", "renewal", "hidden"].includes(
      s
    )
  )
    return "amber";
  return "slate";
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 border-b border-teal-900/10 px-5 py-4">
          <div>
            {title && <h2 className="font-semibold text-teal-950">{title}</h2>}
            {subtitle && <p className="text-xs text-teal-800/70">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-teal-900/15 bg-white/60 px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-teal-900/5 text-teal-700">
          <Icon size={22} />
        </span>
      )}
      <p className="font-semibold text-teal-950">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-teal-800/70">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "teal",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: "teal" | "amber";
}) {
  return (
    <div className="card-hover card p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{label}</p>
        {Icon && (
          <span
            className={`grid h-8 w-8 place-items-center rounded-lg ${
              tone === "amber" ? "bg-amber-100 text-amber-700" : "bg-teal-100 text-teal-700"
            }`}
          >
            <Icon size={15} />
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-3xl text-teal-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-teal-800/70">{hint}</p>}
    </div>
  );
}
