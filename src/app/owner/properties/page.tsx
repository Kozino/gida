"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, slugify, uid } from "@/lib/ids";

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
      <h1 className="font-display text-3xl">Properties & published fees</h1>
      <p className="mt-2 text-sm text-ink-700">
        Leave a field empty to show “Not published”. Publishing a lodge requires verification.
      </p>
      <form onSubmit={add} className="card mt-6 grid gap-3 p-6 md:grid-cols-2">
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
      <div className="mt-6 space-y-3">
        {props.map((p) => (
          <div key={p.id} className="card flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-ink-600">{p.published ? "Published" : "Draft"}</p>
            </div>
            <button
              className="btn-secondary"
              disabled={!canPublish}
              onClick={() =>
                patch((s) => {
                  const x = s.properties.find((y) => y.id === p.id);
                  if (x) x.published = !x.published;
                })
              }
            >
              {p.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
