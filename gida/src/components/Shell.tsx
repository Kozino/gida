"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { homeFor, useAuth } from "@/lib/AuthContext";
import { Building2, LogOut } from "lucide-react";

export function PublicNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-teal-950">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-950 text-amber-400">
            <Building2 size={18} />
          </span>
          Gida
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-teal-900 md:flex">
          <Link href="/browse">Browse rooms</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/trust">Trust</Link>
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
                List your lodge
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
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
    return <p className="p-8 text-sm text-teal-800">Redirecting to sign in…</p>;
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
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{label}</p>
      <p className="mt-2 font-display text-3xl text-teal-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-teal-800/70">{hint}</p>}
    </div>
  );
}
