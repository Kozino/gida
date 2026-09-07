"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { homeFor, useAuth } from "@/lib/AuthContext";
import { Building2, LogOut } from "lucide-react";

export function PublicNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-sand/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink-950">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-white">
            <Building2 size={16} />
          </span>
          Gida
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-700 md:flex">
          <Link href="/browse">Browse lodges</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/trust">Trust & KYC</Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link className="btn-secondary !py-2" href={homeFor(user.role)}>
                Dashboard
              </Link>
              <button
                className="btn-secondary !py-2"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut size={14} />
              </button>
            </>
          ) : (
            <>
              <Link className="btn-secondary !py-2" href="/login">
                Sign in
              </Link>
              <Link className="btn-primary !py-2" href="/register">
                List your property
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function DashNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const path = usePathname();
  const { user, org, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-ink-900/10 bg-white md:block">
        <div className="flex items-center gap-2 px-4 py-4 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-white">
            <Building2 size={16} />
          </span>
          Gida
        </div>
        <nav className="space-y-0.5 px-2">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                path === i.href || path.startsWith(i.href + "/")
                  ? "bg-sand text-ink-950"
                  : "text-ink-700 hover:bg-sand/70"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 hidden w-60 p-4 text-xs text-ink-600 md:block">
          <p className="font-semibold text-ink-900">{user?.name}</p>
          <p className="capitalize">{user?.role?.replace("_", " ")}</p>
          {org && (
            <p className="mt-1 truncate">
              {org.name} · {org.verification}
            </p>
          )}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-ink-900/10 bg-white px-4 py-3 md:hidden">
          <span className="font-semibold">Gida</span>
          <button
            className="text-sm"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
        <div className="hidden justify-end border-b border-ink-900/10 bg-white px-6 py-3 md:flex">
          <button
            className="text-sm text-ink-700"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
        <main className="flex-1 p-4 md:p-8">{/* children via layout */}</main>
      </div>
    </div>
  );
}

export function Guard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);
  if (!user) {
    return <p className="p-8 text-sm text-ink-600">Redirecting to sign in…</p>;
  }
  if (!roles.includes(user.role)) {
    return <p className="p-8">You do not have access to this workspace.</p>;
  }
  return <>{children}</>;
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-600">{hint}</p>}
    </div>
  );
}
