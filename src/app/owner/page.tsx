"use client";

import Link from "next/link";
import { Stat } from "@/components/Shell";
import { useAuth } from "@/lib/AuthContext";

export default function OwnerHome() {
  const { store, org } = useAuth();
  if (!org) return null;
  const rooms = store.rooms.filter((r) => r.orgId === org.id);
  const apps = store.applications.filter((a) => a.orgId === org.id);
  const tens = store.tenancies.filter((t) => t.orgId === org.id && t.active);
  const listed = org.listed && org.verification === "verified";

  return (
    <div>
      <h1 className="font-display text-3xl">{org.name}</h1>
      {!listed && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          Your lodge is <strong>not listed</strong>. Complete KYC and wait for Gida verification.
          <Link className="ml-2 font-semibold underline" href="/owner/onboarding">
            Open KYC
          </Link>
        </div>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Stat label="Rooms" value={rooms.length} />
        <Stat label="Active tenancies" value={tens.length} />
        <Stat label="Applications" value={apps.length} />
        <Stat label="Listing" value={listed ? "Live" : "Hidden"} />
      </div>
    </div>
  );
}
