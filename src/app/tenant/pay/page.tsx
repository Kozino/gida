"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

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

  const mine = store.payments.filter((p) => p.tenantUserId === user?.id);

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl">Pay & receipts</h1>
      <div className="card mt-4 p-4 text-sm">
        <p className="font-semibold">Lodge payout account</p>
        <p>{org?.bankAccountName || "Owner has not published an account yet"}</p>
        <p>{org?.bankName}</p>
        <p className="font-mono">{org?.bankAccountNumber || "—"}</p>
      </div>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <select className="input" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="rent">Rent</option>
          <option value="caution">Caution</option>
          <option value="service">Service charge</option>
        </select>
        <input className="input" placeholder="Transfer reference / note" value={note} onChange={(e) => setNote(e.target.value)} required />
        <button className="btn-primary">Upload receipt note</button>
      </form>
      <ul className="mt-6 space-y-2 text-sm">
        {mine.map((p) => (
          <li key={p.id} className="card p-3">
            {p.type} · {p.status} · {p.receiptNote}
          </li>
        ))}
      </ul>
    </div>
  );
}
