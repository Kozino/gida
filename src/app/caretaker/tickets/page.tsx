"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Ticket } from "@/lib/types";

export default function CTickets() {
  const { store, org, patch } = useAuth();
  const [title, setTitle] = useState("");
  const tickets = store.tickets.filter((t) => t.orgId === org?.id);

  function add(e: FormEvent) {
    e.preventDefault();
    if (!org) return;
    patch((s) => {
      s.tickets.push({
        id: uid("tix"),
        orgId: org.id,
        propertyId: s.properties.find((p) => p.orgId === org.id)?.id || "",
        title,
        category: "other",
        status: "open",
        createdAt: nowIso(),
      });
    });
    setTitle("");
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Generator, water, repairs</h1>
      <form onSubmit={add} className="mt-4 flex gap-2">
        <input className="input" placeholder="e.g. Borehole down" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="btn-primary">Log</button>
      </form>
      <ul className="mt-6 space-y-2">
        {tickets.map((t: Ticket) => (
          <li key={t.id} className="card p-4 text-sm">
            {t.title} · {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
