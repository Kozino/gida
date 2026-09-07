"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney, nowIso, uid } from "@/lib/ids";

export default function PaymentsPage() {
  const { store, org, user, patch } = useAuth();
  const pays = store.payments.filter((p) => p.orgId === org?.id);
  if (!org) return null;
  return (
    <div>
      <h1 className="font-display text-3xl">Payments</h1>
      <p className="mt-2 text-sm text-ink-600">
        Confirm transfers against the accounts you set. Processor webhooks come later via
        Paystack / Flutterwave env keys.
      </p>
      <ul className="mt-6 space-y-3">
        {pays.length === 0 && <p className="text-sm">No payments uploaded yet.</p>}
        {pays.map((p) => (
          <li key={p.id} className="card flex items-center justify-between p-4 text-sm">
            <div>
              <p className="font-semibold capitalize">
                {p.type} · {formatMoney(p.amount)}
              </p>
              <p className="text-ink-600">
                {p.method} · {p.status} · {p.receiptNote}
              </p>
            </div>
            {p.status === "pending" && (
              <button
                className="btn-accent"
                onClick={() =>
                  patch((s) => {
                    const x = s.payments.find((y) => y.id === p.id);
                    if (x) x.status = "confirmed";
                    s.audit.push({
                      id: uid("aud"),
                      orgId: org.id,
                      actorId: user!.id,
                      action: "payment.confirmed",
                      detail: p.id,
                      createdAt: nowIso(),
                    });
                  })
                }
              >
                Confirm
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
