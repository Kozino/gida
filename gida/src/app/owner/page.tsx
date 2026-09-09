"use client";

import Link from "next/link";
import { StatCard, PageTitle, Pill } from "@/components/DashShell";
import { useAuth } from "@/lib/AuthContext";
import { DoorOpen, UserRound, ClipboardList, Radio, ShieldAlert } from "lucide-react";

export default function OwnerHome() {
  const { store, org } = useAuth();
  if (!org) return null;
  const rooms = store.rooms.filter((r) => r.orgId === org.id);
  const apps = store.applications.filter((a) => a.orgId === org.id);
  const tens = store.tenancies.filter((t) => t.orgId === org.id && t.active);
  const listed = org.listed && org.verification === "verified";

  return (
    <div>
      <PageTitle
        kicker="Overview"
        title={org.name}
        subtitle={`${org.city}, ${org.state} · ${org.type}`}
        action={<Pill tone={listed ? "emerald" : "amber"}>{listed ? "Live on Gida" : "Not listed"}</Pill>}
      />
      {!listed && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 shrink-0 text-amber-700" size={20} />
            <div>
              <p className="text-sm font-semibold text-amber-900">Your lodge is not listed yet</p>
              <p className="text-sm text-amber-800/80">Complete KYC and wait for Gida verification to start receiving tenants.</p>
            </div>
          </div>
          <Link className="btn-accent shrink-0" href="/owner/onboarding">
            Open KYC
          </Link>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Rooms" value={rooms.length} icon={DoorOpen} />
        <StatCard label="Active tenancies" value={tens.length} icon={UserRound} />
        <StatCard label="Applications" value={apps.length} icon={ClipboardList} />
        <StatCard label="Listing" value={listed ? "Live" : "Hidden"} icon={Radio} tone={listed ? "teal" : "amber"} />
      </div>
    </div>
  );
}
