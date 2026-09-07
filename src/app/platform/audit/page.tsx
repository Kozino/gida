"use client";

import { useAuth } from "@/lib/AuthContext";

export default function Audit() {
  const { store } = useAuth();
  return (
    <div>
      <h1 className="font-display text-3xl">Audit</h1>
      <ul className="mt-6 space-y-2 text-sm">
        {[...store.audit].reverse().map((a) => (
          <li key={a.id} className="card p-3">
            <span className="font-semibold">{a.action}</span> — {a.detail}
            <span className="block text-xs text-ink-600">{a.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
