"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Role } from "@/lib/types";

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
      <h1 className="font-display text-3xl">Staff</h1>
      <p className="mt-2 text-sm text-ink-600">New staff password for demo: demo</p>
      <form onSubmit={add} className="card mt-6 grid gap-3 p-6 md:grid-cols-3">
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
      <ul className="mt-6 space-y-2">
        {staff.map((u) => (
          <li key={u.id} className="card flex justify-between p-4 text-sm">
            <span>{u.name}</span>
            <span className="capitalize text-ink-600">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
