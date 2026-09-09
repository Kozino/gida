"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Ticket } from "@/lib/types";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { Wrench } from "lucide-react";

export default function CTickets() {
  const { store, org, patch } = useAuth();
  const [title, setTitle] = useState("");
  const tickets = [...store.tickets.filter((t) => t.orgId === org?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

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
    <div className="max-w-2xl">
      <PageTitle kicker="Yard tickets" title="Generator, water, repairs" subtitle="Log site-wide issues that aren't tied to one tenant." />
      <SectionCard>
        <form onSubmit={add} className="flex gap-2">
          <input className="input" placeholder="e.g. Borehole down" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button className="btn-primary shrink-0">Log</button>
        </form>
      </SectionCard>

      <SectionCard title="Open & recent" className="mt-6" padded={tickets.length === 0}>
        {tickets.length === 0 ? (
          <EmptyState icon={Wrench} title="No yard tickets logged" />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {tickets.map((t: Ticket) => (
              <div key={t.id} className="list-row">
                <p className="text-sm font-medium text-teal-950">{t.title}</p>
                <Pill tone={statusTone(t.status)}>{t.status.replace("_", " ")}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
