"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import Link from "next/link";
import { Home, Compass, ClipboardList } from "lucide-react";

export default function TenantHome() {
  const { store, user } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id && t.active);
  const apps = store.applications.filter((a) => a.tenantUserId === user?.id);
  const org = store.orgs.find((o) => o.id === ten?.orgId || o.id === user?.orgId);
  const room = store.rooms.find((r) => r.id === ten?.roomId);

  return (
    <div>
      <PageTitle kicker="Welcome" title={`Hello, ${user?.name}`} subtitle={ten ? "Here's where things stand with your tenancy." : undefined} />

      {ten ? (
        <SectionCard>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{org?.name}</p>
              <p className="mt-1 font-display text-2xl text-teal-950">
                Room {room?.block} {room?.name}
              </p>
              <p className="mt-2 text-sm text-teal-800">
                Tenancy {ten.startDate} → {ten.endDate}
              </p>
            </div>
            <Pill tone="emerald">Active tenancy</Pill>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-teal-900/10 pt-4">
            <p className="text-sm text-teal-800">
              Rent on file: <span className="font-semibold text-teal-950">{formatMoney(ten.rent)}</span>
            </p>
            <Link href="/tenant/pay" className="btn-secondary !py-2 text-sm">
              Pay & receipts
            </Link>
          </div>
          <p className="mt-3 text-xs text-teal-800/70">
            Pay only the account shown under Pay & receipts. Token account is different.
          </p>
        </SectionCard>
      ) : (
        <EmptyState
          icon={Home}
          title="No active tenancy"
          description="Browse verified lodges and apply with a visit token from a caretaker."
          action={
            <Link className="btn-primary" href="/browse">
              <Compass size={15} /> Browse verified lodges
            </Link>
          }
        />
      )}

      <SectionCard title="Applications" className="mt-8" padded={apps.length === 0}>
        {apps.length === 0 ? (
          <EmptyState icon={ClipboardList} title="No applications yet" description="Applications you submit will be tracked here." />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {apps.map((a) => (
              <div key={a.id} className="list-row">
                <p className="text-sm font-medium text-teal-950">{a.applicantName || "Application"}</p>
                <Pill tone={statusTone(a.status)}>{a.status.replace(/_/g, " ")}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
