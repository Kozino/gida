"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { Landmark, Receipt, UploadCloud } from "lucide-react";

export default function Pay() {
  const { store, user, patch } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id);
  const org = store.orgs.find((o) => o.id === ten?.orgId || o.id === user?.orgId);
  const [note, setNote] = useState("");
  const [type, setType] = useState<"rent" | "caution" | "service">("rent");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!org || !user) return;
    patch((s) => {
      s.payments.push({
        id: uid("pay"),
        orgId: org.id,
        tenantUserId: user.id,
        type,
        amount: null,
        method: "transfer",
        receiptNote: note,
        status: "pending",
        createdAt: nowIso(),
      });
    });
    setNote("");
  }

  const mine = [...store.payments.filter((p) => p.tenantUserId === user?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Payments" title="Pay & receipts" subtitle="Pay only the account below — the token account is different." />

      <SectionCard title="Lodge payout account" action={<Landmark className="text-teal-700" size={18} />}>
        {org?.bankAccountNumber ? (
          <div className="grid gap-1 text-sm">
            <p className="font-semibold text-teal-950">{org?.bankAccountName || "Owner has not published an account name"}</p>
            <p className="text-teal-800">{org?.bankName}</p>
            <p className="font-mono text-lg tracking-wide text-teal-950">{org?.bankAccountNumber}</p>
          </div>
        ) : (
          <p className="text-sm text-teal-800/70">Owner has not published an account yet.</p>
        )}
      </SectionCard>

      <SectionCard title="Upload a receipt note" className="mt-6">
        <form onSubmit={submit} className="space-y-3">
          <select className="input" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="rent">Rent</option>
            <option value="caution">Caution</option>
            <option value="service">Service charge</option>
          </select>
          <input
            className="input"
            placeholder="Transfer reference / note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
          <button className="btn-primary">
            <UploadCloud size={15} /> Upload receipt note
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Payment history" className="mt-6" padded={mine.length === 0}>
        {mine.length === 0 ? (
          <EmptyState icon={Receipt} title="No payments logged yet" />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {mine.map((p) => (
              <div key={p.id} className="list-row">
                <div>
                  <p className="text-sm font-medium capitalize text-teal-950">{p.type}</p>
                  {p.receiptNote && <p className="text-xs text-teal-800/70">{p.receiptNote}</p>}
                </div>
                <Pill tone={statusTone(p.status)}>{p.status}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
