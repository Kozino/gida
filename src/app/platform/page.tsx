"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard } from "@/components/DashShell";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Queue() {
  const { store, user, patch } = useAuth();
  const queue = store.orgs.filter((o) => o.verification === "submitted" || o.verification === "needs_info");

  function setStatus(id: string, ok: boolean) {
    const reason = ok ? "" : window.prompt("Reason for rejection / more info") || "Needs more documents";
    patch((s) => {
      const o = s.orgs.find((x) => x.id === id);
      if (!o) return;
      o.verification = ok ? "verified" : "needs_info";
      o.status = ok ? "active" : "pending";
      o.listed = ok;
      o.rejectionReason = ok ? undefined : reason;
      s.audit.push({
        id: uid("aud"),
        orgId: id,
        actorId: user!.id,
        action: ok ? "org.verified" : "org.needs_info",
        detail: reason,
        createdAt: nowIso(),
      });
    });
  }

  return (
    <div>
      <PageTitle
        kicker="Trust & safety"
        title="Verification queue"
        subtitle="Owners cannot be browsed until you verify them. This is the gate."
        action={<Pill tone={queue.length ? "amber" : "emerald"}>{queue.length} pending</Pill>}
      />
      {queue.length === 0 ? (
        <EmptyState icon={CheckCircle2} title="Queue clear" description="No organisations are waiting on verification right now." />
      ) : (
        <div className="space-y-4">
          {queue.map((o) => (
            <SectionCard key={o.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-teal-950">{o.name}</p>
                    <Pill tone={o.verification === "needs_info" ? "amber" : "slate"}>{o.verification.replace("_", " ")}</Pill>
                  </div>
                  <p className="mt-1 text-sm text-teal-800/80">
                    {o.city}, {o.state} · NIN {o.nin || "missing"} · CAC {o.cac || "—"} · {o.bankName} {o.bankAccountNumber}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button className="btn-accent" onClick={() => setStatus(o.id, true)}>
                    <ShieldCheck size={15} /> Verify & list
                  </button>
                  <button className="btn-secondary" onClick={() => setStatus(o.id, false)}>
                    Request info
                  </button>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
