"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney, nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, statusTone } from "@/components/DashShell";
import { Wallet, CheckCircle2 } from "lucide-react";

export default function PaymentsPage() {
  const { store, org, user, patch } = useAuth();
  const pays = [...store.payments.filter((p) => p.orgId === org?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  if (!org) return null;

  return (
    <div>
      <PageTitle
        kicker="Ledger"
        title="Payments"
        subtitle="Confirm transfers against the accounts you set. Processor webhooks come later via Paystack / Flutterwave env keys."
      />
      {pays.length === 0 ? (
        <EmptyState icon={Wallet} title="No payments uploaded yet" />
      ) : (
        <div className="space-y-3">
          {pays.map((p) => (
            <div key={p.id} className="card-hover card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold capitalize text-teal-950">
                  {p.type} · {formatMoney(p.amount)}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-teal-800/70">
                  <span className="capitalize">{p.method}</span>
                  <Pill tone={statusTone(p.status)}>{p.status}</Pill>
                  {p.receiptNote && <span>{p.receiptNote}</span>}
                </div>
              </div>
              {p.status === "pending" && (
                <button
                  className="btn-accent shrink-0"
                  onClick={() =>
                    patch((s) => {
                      const x = s.payments.find((y) => y.id === p.id);
                      if (x) x.status = "confirmed";
                      if (!org) return;
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
                  <CheckCircle2 size={15} /> Confirm
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
