"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Ticket } from "@/lib/types";

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

  const mine = store.tickets.filter((t) => t.tenantUserId === user?.id);

  return (
    <div>
      <h1 className="font-display text-3xl">Repairs</h1>
      <form onSubmit={add} className="mt-4 space-y-3">
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value as Ticket["category"])}>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="power">NEPA / generator</option>
          <option value="water">Water</option>
          <option value="security">Security</option>
          <option value="other">Other</option>
        </select>
        <input className="input" placeholder="What's wrong?" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button className="btn-primary">Send to caretaker</button>
      </form>
      <ul className="mt-6 space-y-2 text-sm">
        {mine.map((t) => (
          <li key={t.id} className="card p-3">
            {t.title} · {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
