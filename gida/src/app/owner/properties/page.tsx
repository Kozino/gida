"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { formatMoney, nowIso, slugify, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard } from "@/components/DashShell";
import { Building2 } from "lucide-react";

function num(v: string): number | null {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function PropertiesPage() {
  const { store, org, patch } = useAuth();
  const props = store.properties.filter((p) => p.orgId === org?.id);
  const [name, setName] = useState("");
  const [cycle, setCycle] = useState("yearly");
  const [tokenFee, setTokenFee] = useState("");
  const [first, setFirst] = useState("");
  const [renew, setRenew] = useState("");
  const [caution, setCaution] = useState("");

  if (!org) return null;
  const canPublish = org.verification === "verified";

  function add(e: FormEvent) {
    e.preventDefault();
    if (!org) return;
    patch((s) => {
      s.properties.push({
        id: uid("prop"),
        orgId: org.id,
        name,
        slug: slugify(name),
        description: "",
        state: org.state,
        city: org.city,
        address: org.address || "",
        genderPolicy: "any",
        occupancyType: "whole_room",
        cycle: cycle as "yearly",
        tokenFee: num(tokenFee),
        firstYearRent: num(first),
        renewalRent: num(renew),
        cautionFee: num(caution),
        serviceCharge: null,
        published: false,
        rules: "No agents. Token from rostered caretaker only.",
        createdAt: nowIso(),
      });
    });
    setName("");
  }

  return (
    <div>
      <PageTitle
        kicker="Listings"
        title="Properties & published fees"
        subtitle={
          canPublish
            ? "Leave a field empty to show \u201cNot published\u201d."
            : "Publishing a lodge requires verification — properties stay in draft until then."
        }
        action={!canPublish ? <Pill tone="amber">Verification required to publish</Pill> : undefined}
      />

      <SectionCard title="Add a property" action={<Building2 className="text-teal-700" size={18} />}>
        <form onSubmit={add} className="grid gap-3 md:grid-cols-2">
          <input className="input md:col-span-2" placeholder="Property name" value={name} onChange={(e) => setName(e.target.value)} required />
          <select className="input" value={cycle} onChange={(e) => setCycle(e.target.value)}>
            <option value="yearly">Yearly / session</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="session">Academic session</option>
          </select>
          <input className="input" placeholder="Token fee (optional)" value={tokenFee} onChange={(e) => setTokenFee(e.target.value)} />
          <input className="input" placeholder="First occupancy rent" value={first} onChange={(e) => setFirst(e.target.value)} />
          <input className="input" placeholder="Renewal rent" value={renew} onChange={(e) => setRenew(e.target.value)} />
          <input className="input" placeholder="Caution fee" value={caution} onChange={(e) => setCaution(e.target.value)} />
          <button className="btn-primary md:col-span-2">Add property</button>
        </form>
      </SectionCard>

      <SectionCard title="All properties" className="mt-6" padded={props.length === 0}>
        {props.length === 0 ? (
          <EmptyState icon={Building2} title="No properties yet" description="Add your first property above to start listing rooms." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {props.map((p) => (
              <div key={p.id} className="card-hover rounded-2xl border border-teal-900/10 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-teal-950">{p.name}</p>
                    <p className="text-xs capitalize text-teal-800/70">{p.cycle} cycle</p>
                  </div>
                  <Pill tone={p.published ? "emerald" : "slate"}>{p.published ? "Published" : "Draft"}</Pill>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-teal-800/70">First-year rent</dt>
                  <dd className="text-right font-medium text-teal-950">{formatMoney(p.firstYearRent)}</dd>
                  <dt className="text-teal-800/70">Renewal rent</dt>
                  <dd className="text-right font-medium text-teal-950">{formatMoney(p.renewalRent)}</dd>
                  <dt className="text-teal-800/70">Caution fee</dt>
                  <dd className="text-right font-medium text-teal-950">{formatMoney(p.cautionFee)}</dd>
                  <dt className="text-teal-800/70">Token fee</dt>
                  <dd className="text-right font-medium text-teal-950">{formatMoney(p.tokenFee)}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
