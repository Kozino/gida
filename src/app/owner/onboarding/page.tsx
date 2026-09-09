"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

export default function Onboarding() {
  const { org, patch } = useAuth();
  const [nin, setNin] = useState(org?.nin || "");
  const [cac, setCac] = useState(org?.cac || "");
  const [bankName, setBankName] = useState(org?.bankName || "");
  const [bankAccountName, setBankAccountName] = useState(org?.bankAccountName || "");
  const [bankAccountNumber, setBankAccountNumber] = useState(org?.bankAccountNumber || "");
  const [whatsapp, setWhatsapp] = useState(org?.whatsapp || "");
  const [address, setAddress] = useState(org?.address || "");

  if (!org) return null;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!org) return;
    patch((s) => {
      const o = s.orgs.find((x) => x.id === org.id);
      if (!o) return;
      o.nin = nin;
      o.cac = cac;
      o.bankName = bankName;
      o.bankAccountName = bankAccountName;
      o.bankAccountNumber = bankAccountNumber;
      o.whatsapp = whatsapp;
      o.address = address;
      o.verification = "submitted";
      o.status = "pending";
      o.listed = false;
      s.audit.push({
        id: uid("aud"),
        orgId: org.id,
        actorId: org.ownerUserId,
        action: "kyc.submitted",
        detail: "Awaiting platform review",
        createdAt: nowIso(),
      });
    });
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl">KYC & listing lock</h1>
      <p className="mt-2 text-sm text-ink-700">
        Status: <strong className="capitalize">{org.verification}</strong>
        {org.rejectionReason && <span> — {org.rejectionReason}</span>}
      </p>
      <form onSubmit={submit} className="card mt-6 space-y-3 p-6">
        <input className="input" placeholder="NIN" value={nin} onChange={(e) => setNin(e.target.value)} />
        <input className="input" placeholder="CAC / RC (if company)" value={cac} onChange={(e) => setCac(e.target.value)} />
        <input className="input" placeholder="Bank name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
        <input className="input" placeholder="Account name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
        <input className="input" placeholder="Account number" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
        <input className="input" placeholder="Official WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        <input className="input" placeholder="Physical address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className="btn-primary">Submit for verification</button>
      </form>
    </div>
  );
}
