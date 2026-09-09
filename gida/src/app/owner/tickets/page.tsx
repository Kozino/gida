"use client";

import { useAuth } from "@/lib/AuthContext";
import { PageTitle, Pill, EmptyState, statusTone } from "@/components/DashShell";
import { Wrench } from "lucide-react";

export default function TicketsOwner() {
  const { store, org, patch } = useAuth();
  const tickets = [...store.tickets.filter((t) => t.orgId === org?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div>
      <PageTitle kicker="Facilities" title="Maintenance" subtitle={`${tickets.filter((t) => t.status !== "resolved" && t.status !== "closed").length} open tickets`} />
      {tickets.length === 0 ? (
        <EmptyState icon={Wrench} title="No maintenance tickets" description="Tickets raised by tenants and caretakers will land here." />
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="card-hover card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold text-teal-950">{t.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs capitalize text-teal-800/70">{t.category}</span>
                  <Pill tone={statusTone(t.status)}>{t.status.replace("_", " ")}</Pill>
                </div>
              </div>
              <button
                className="btn-secondary shrink-0"
                onClick={() =>
                  patch((s) => {
                    const x = s.tickets.find((y) => y.id === t.id);
                    if (x) x.status = x.status === "resolved" ? "open" : "resolved";
                  })
                }
              >
                Toggle resolved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
