"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Ticket } from "@/lib/types";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { Wrench, Send } from "lucide-react";

export default function Tix() {
  const { store, user, patch } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Ticket["category"]>("electrical");

  function add(e: FormEvent) {
    e.preventDefault();
    if (!ten || !user) return;
    patch((s) => {
      s.tickets.push({
        id: uid("tix"),
        orgId: ten.orgId,
        propertyId: ten.propertyId,
        tenantUserId: user.id,
        title,
        category,
        status: "open",
        createdAt: nowIso(),
      });
    });
    setTitle("");
  }

  const mine = [...store.tickets.filter((t) => t.tenantUserId === user?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Maintenance" title="Repairs" subtitle="Report an issue and the caretaker gets notified." />

      <SectionCard title="Report an issue">
        <form onSubmit={add} className="space-y-3">
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value as Ticket["category"])}>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="power">NEPA / generator</option>
            <option value="water">Water</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
          <input className="input" placeholder="What's wrong?" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <button className="btn-primary">
            <Send size={15} /> Send to caretaker
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Your tickets" className="mt-6" padded={mine.length === 0}>
        {mine.length === 0 ? (
          <EmptyState icon={Wrench} title="No repair tickets yet" />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {mine.map((t) => (
              <div key={t.id} className="list-row">
                <div>
                  <p className="text-sm font-medium text-teal-950">{t.title}</p>
                  <p className="text-xs capitalize text-teal-800/70">{t.category}</p>
                </div>
                <Pill tone={statusTone(t.status)}>{t.status.replace("_", " ")}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
