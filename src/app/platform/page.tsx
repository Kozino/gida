"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

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
      <h1 className="font-display text-3xl">Verification queue</h1>
      <p className="mt-2 text-sm text-ink-700">
        Owners cannot be browsed until you verify them. This is the gate.
      </p>
      <div className="mt-6 space-y-3">
        {queue.length === 0 && <p className="text-sm">Queue clear.</p>}
        {queue.map((o) => (
          <div key={o.id} className="card p-5">
            <p className="font-semibold">{o.name}</p>
            <p className="text-sm text-ink-600">
              {o.city}, {o.state} · NIN {o.nin || "missing"} · CAC {o.cac || "—"} · {o.bankName}{" "}
              {o.bankAccountNumber}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="btn-accent" onClick={() => setStatus(o.id, true)}>
                Verify & list
              </button>
              <button className="btn-secondary" onClick={() => setStatus(o.id, false)}>
                Request info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
