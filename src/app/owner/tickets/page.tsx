"use client";

import { useAuth } from "@/lib/AuthContext";

export default function TicketsOwner() {
  const { store, org, patch } = useAuth();
  const tickets = store.tickets.filter((t) => t.orgId === org?.id);
  return (
    <div>
      <h1 className="font-display text-3xl">Maintenance</h1>
      <ul className="mt-6 space-y-3">
        {tickets.length === 0 && <p className="text-sm text-ink-600">No tickets.</p>}
        {tickets.map((t) => (
          <li key={t.id} className="card flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-xs capitalize text-ink-600">
                {t.category} · {t.status}
              </p>
            </div>
            <button
              className="btn-secondary"
              onClick={() =>
                patch((s) => {
                  const x = s.tickets.find((y) => y.id === t.id);
                  if (x) x.status = x.status === "resolved" ? "open" : "resolved";
                })
              }
            >
              Toggle resolved
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
