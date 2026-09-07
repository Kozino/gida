"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

export default function CareApps() {
  const { store, org, user, patch } = useAuth();
  const apps = store.applications.filter((a) => a.orgId === org?.id);
  return (
    <div>
      <h1 className="font-display text-3xl">Caretaker review</h1>
      <ul className="mt-6 space-y-3">
        {apps.map((a) => (
          <li key={a.id} className="card p-4">
            <p className="font-semibold">{a.applicantName}</p>
            <p className="text-xs">{a.status}</p>
            <button
              className="btn-secondary mt-2"
              onClick={() =>
                patch((s) => {
                  const x = s.applications.find((y) => y.id === a.id);
                  if (x && x.status === "signed") x.status = "caretaker_review";
                  s.audit.push({
                    id: uid("aud"),
                    orgId: org?.id,
                    actorId: user!.id,
                    action: "application.caretaker_ok",
                    detail: a.id,
                    createdAt: nowIso(),
                  });
                })
              }
            >
              Mark reviewed for owner
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
