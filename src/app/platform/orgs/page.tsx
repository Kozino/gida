"use client";

import { useAuth } from "@/lib/AuthContext";

export default function Orgs() {
  const { store } = useAuth();
  return (
    <div>
      <h1 className="font-display text-3xl">Organisations</h1>
      <ul className="mt-6 space-y-2">
        {store.orgs.map((o) => (
          <li key={o.id} className="card flex justify-between p-4 text-sm">
            <span>
              {o.name} · {o.city}
            </span>
            <span className="capitalize">
              {o.verification} {o.listed ? "· listed" : "· hidden"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
