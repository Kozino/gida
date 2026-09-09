"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Role } from "@/lib/types";
import { PageTitle, Pill, EmptyState, SectionCard } from "@/components/DashShell";
import { UserPlus, Users } from "lucide-react";

export default function StaffPage() {
  const { store, org, patch } = useAuth();
  const staff = store.users.filter((u) => u.orgId === org?.id && u.role !== "tenant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("caretaker");

  if (!org) return null;

  function add(e: FormEvent) {
    e.preventDefault();
    if (!org) return;
    patch((s) => {
      s.users.push({
        id: uid("usr"),
        email,
        phone: "",
        password: "demo",
        name,
        role,
        orgId: org.id,
        createdAt: nowIso(),
      });
    });
    setName("");
    setEmail("");
  }

  return (
    <div>
      <PageTitle kicker="Team" title="Staff" subtitle="New staff sign in with the demo password: demo" />

      <SectionCard title="Invite staff" action={<UserPlus className="text-teal-700" size={18} />}>
        <form onSubmit={add} className="grid gap-3 md:grid-cols-3">
          <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <select className="input" value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="caretaker">Caretaker</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
            <option value="security">Security</option>
          </select>
          <button className="btn-primary md:col-span-3">Invite staff</button>
        </form>
      </SectionCard>

      <SectionCard title="Team members" className="mt-6" padded={staff.length === 0}>
        {staff.length === 0 ? (
          <EmptyState icon={Users} title="No staff invited yet" />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {staff.map((u) => (
              <div key={u.id} className="list-row">
                <p className="text-sm font-medium text-teal-950">{u.name}</p>
                <Pill tone="slate">{u.role}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
