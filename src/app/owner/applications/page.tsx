"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

export default function AppsPage() {
  const { store, org, user, patch } = useAuth();
  const apps = store.applications.filter((a) => a.orgId === org?.id);
  if (!org) return null;

  function decide(id: string, ok: boolean) {
    patch((s) => {
      const a = s.applications.find((x) => x.id === id);
      if (!a) return;
      a.status = ok ? "approved" : "rejected";
      if (ok && a.roomId) {
        const room = s.rooms.find((r) => r.id === a.roomId);
        s.tenancies.push({
          id: uid("ten"),
          orgId: org.id,
          propertyId: a.propertyId,
          roomId: a.roomId,
          tenantUserId: a.tenantUserId,
          startDate: new Date().toISOString().slice(0, 10),
          endDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
          rent: room?.rent ?? null,
          cautionHeld: null,
          active: true,
        });
        if (room) {
          room.occupiedBeds += 1;
          if (room.occupiedBeds >= room.beds) room.available = false;
        }
        const tu = s.users.find((u) => u.id === a.tenantUserId);
        if (tu) {
          tu.orgId = org.id;
          tu.role = "tenant";
        }
      }
      s.audit.push({
        id: uid("aud"),
        orgId: org.id,
        actorId: user!.id,
        action: ok ? "application.approved" : "application.rejected",
        detail: id,
        createdAt: nowIso(),
      });
    });
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Applications</h1>
      <div className="mt-6 space-y-3">
        {apps.length === 0 && <p className="text-sm text-ink-600">None yet.</p>}
        {apps.map((a) => (
          <div key={a.id} className="card p-4">
            <p className="font-semibold">{a.applicantName}</p>
            <p className="text-xs text-ink-600">
              {a.status} · surety {a.suretyName || "—"}
            </p>
            {a.status !== "approved" && a.status !== "rejected" && (
              <div className="mt-3 flex gap-2">
                <button className="btn-accent" onClick={() => decide(a.id, true)}>
                  Approve
                </button>
                <button className="btn-secondary" onClick={() => decide(a.id, false)}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
