"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, SectionCard, statusTone } from "@/components/DashShell";
import { ShieldCheck } from "lucide-react";

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
    <div className="max-w-2xl">
      <PageTitle
        kicker="Trust & safety"
        title="KYC & listing lock"
        subtitle="You stay unlisted until Gida verifies your details — this protects tenants from fake lodges."
        action={
          <Pill tone={statusTone(org.verification)}>{org.verification.replace("_", " ")}</Pill>
        }
      />
      {org.rejectionReason && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
          <strong>Reviewer note:</strong> {org.rejectionReason}
        </div>
      )}
      <SectionCard title="Verification details" action={<ShieldCheck className="text-teal-700" size={18} />}>
        <form onSubmit={submit} className="grid gap-3">
          <input className="input" placeholder="NIN" value={nin} onChange={(e) => setNin(e.target.value)} />
          <input className="input" placeholder="CAC / RC (if company)" value={cac} onChange={(e) => setCac(e.target.value)} />
          <input className="input" placeholder="Bank name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
          <input className="input" placeholder="Account name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
          <input className="input" placeholder="Account number" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
          <input className="input" placeholder="Official WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          <input className="input" placeholder="Physical address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button className="btn-primary">Submit for verification</button>
        </form>
      </SectionCard>
    </div>
  );
}
