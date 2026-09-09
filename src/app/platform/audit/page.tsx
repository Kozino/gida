"use client";

import { useAuth } from "@/lib/AuthContext";
import { PageTitle, EmptyState } from "@/components/DashShell";
import { ScrollText } from "lucide-react";

export default function Audit() {
  const { store } = useAuth();
  const events = [...store.audit].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div>
      <PageTitle kicker="Compliance" title="Audit trail" subtitle="Every verification decision, timestamped and traceable." />
      {events.length === 0 ? (
        <EmptyState icon={ScrollText} title="No events yet" description="Actions taken on the platform will be logged here." />
      ) : (
        <div className="card divide-y divide-teal-900/5">
          {events.map((e) => (
            <div key={e.id} className="list-row items-start">
              <div>
                <p className="text-sm font-medium capitalize text-teal-950">{e.action.replace(/\./g, " · ")}</p>
                {e.detail && <p className="text-xs text-teal-800/70">{e.detail}</p>}
              </div>
              <p className="shrink-0 text-xs text-teal-800/60">{new Date(e.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
